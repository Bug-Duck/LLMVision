import { ZhipuAIEmbeddings, ZhipuAIEmbeddingsParams } from "@langchain/community/embeddings/zhipuai"
import { ChatZhipuAI, ChatZhipuAIParams } from '@langchain/community/chat_models/zhipuai'
import { VisionBase, VisionBaseParams } from "./base"
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { footer, fromFileTree, main, operation } from "../prompts"
import { readDirToObject, writeFilesFromObject } from '../utils/list-file-tree'
import { resolve } from "path"

export interface VisionZhipuAIParams extends VisionBaseParams {
  model: ChatZhipuAIParams['modelName']
  embeddingsModel: ZhipuAIEmbeddingsParams['modelName']
  key: string
}

export class VisionZhipuAI extends VisionBase {
  embeddings: ZhipuAIEmbeddings | undefined
  store: FaissStore | undefined
  model: ChatZhipuAI | undefined

  async init(params: VisionZhipuAIParams): Promise<void> {
    await super.init(params)
    this.embeddings = new ZhipuAIEmbeddings({
      apiKey: params.key,
      modelName: params.embeddingsModel,
    })
    this.store = await FaissStore.fromDocuments(this.splittedDocument!, this.embeddings)
    this.model = new ChatZhipuAI({
      apiKey: params.key,
      modelName: params.model,
    })
  }

  override async generate(userInput: string, width: number, height: number): Promise<string> {
    const retriever = this.store?.asRetriever()
    const context = await retriever?.invoke(userInput)
    const knowledges = context?.map(doc => doc.pageContent).join('\n')!
    const prompts = new SystemMessage(main)
    const response = await this.model?.invoke([new SystemMessage(prompts), new SystemMessage(knowledges), new HumanMessage(userInput), new HumanMessage(footer)])
    return response!.content as string
  }

  override async operate(AiInput: string, root: string): Promise<void> {
    const response = await this.model?.invoke([
      new SystemMessage(fromFileTree(
        readDirToObject(root)
      ) + operation),
      new HumanMessage(AiInput)
    ])
    const { content } = response!
    const data = JSON.parse((content as string).replace(/^```json/, '').replace(/```$/, ''))
    writeFilesFromObject(resolve(root), data)
  }
}