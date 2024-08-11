import { ChatOpenAI } from '@langchain/openai'
import { systemMessage } from '../prompts/core'
import { HumanMessage } from '@langchain/core/messages'
import { frequencyMistake } from '../prompts/frequency-mistake'

export interface OpenAIOptions {
  apiKey?: string
  openAIApiKey?: string
  temperature?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  model?: string
}

export function createVisionAppBasedOnOpenAI(openAIOptions: OpenAIOptions) {
  const openai = new ChatOpenAI(openAIOptions)

  return openai
}
