import { ChatZhipuAIParams } from "@langchain/community/chat_models/zhipuai"
import { ZhipuAIEmbeddingsParams } from "@langchain/community/embeddings/zhipuai"

export interface ZhipuAICache {
  base: ('zhipu_ai' | 'anthropic')
  model: ChatZhipuAIParams['model']
  embeddingKey: string
  embedding: ZhipuAIEmbeddingsParams['modelName']
  key: string
}

export type CacheSet = ZhipuAICache
