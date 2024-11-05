import { ChatAnthropic, AnthropicInput } from "@langchain/anthropic"
import { VisionBase, VisionBaseParams } from "./base"
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { documentDesc, footer, fromFileTree, main, operation } from "../prompts"
import { readDirToObject, writeFilesFromObject } from '../utils/list-file-tree'
import { resolve } from "path"
import { ZhipuAIEmbeddings, ZhipuAIEmbeddingsParams } from "@langchain/community/embeddings/zhipuai"

export interface VisionAnthropicParams extends VisionBaseParams {
  model: AnthropicInput['model']
  embeddingsModel: ZhipuAIEmbeddingsParams['modelName']
  key: string
  embeddingKey: string
}

export class VisionAnthropicAI extends VisionBase {
  embeddings: ZhipuAIEmbeddings | undefined
  store: FaissStore | undefined
  model: ChatAnthropic | undefined

  async init(params: VisionAnthropicParams): Promise<void> {
    await super.init(params)
    this.embeddings = new ZhipuAIEmbeddings({
      apiKey: params.embeddingKey,
      modelName: params.embeddingsModel,
    })
    this.store = await FaissStore.fromDocuments(this.splittedDocument!, this.embeddings)
    this.model = new ChatAnthropic({
      apiKey: params.key,
      modelName: params.model
    })
  }

  override async generate(userInput: string, width: number, height: number): Promise<string> {
    const retriever = this.store?.asRetriever()
    const context = await retriever?.invoke(userInput)
    const knowledges = context?.map(doc => doc.pageContent).join('\n')!
    const prompts = new SystemMessage(main)
    const response = await this.model?.invoke([
      new SystemMessage(prompts + '\n' + knowledges + '\n' + documentDesc),
      new HumanMessage(userInput),
      new HumanMessage(footer)
    ])
    return response!.content as string
  }

  override async operate(AiInput: string, root: string): Promise<void> {
    const input = [
      new SystemMessage(fromFileTree(
        readDirToObject(root)
      ) + operation),
      new HumanMessage(AiInput)
    ]
    console.log(input)
    const response = await this.model?.invoke(input)
    const { content } = response!
    const data = JSON.parse((content as string).replace(/^```json/, '').replace(/```$/, ''))
    writeFilesFromObject(resolve(root), data)
  }
}