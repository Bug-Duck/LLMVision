import { OpenAI } from '@langchain/openai'

export interface OpenAIOptions {
  apiKey: string
  temperature?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  model?: string
}

export function createVisionAppBasedOnOpenAI(openAIOptions: OpenAIOptions) {
  const openai = new OpenAI(openAIOptions)

  return openai
}
