import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { systemMessage } from './prompts/core'
import { frequencyMistake } from './prompts/frequency-mistake'
import { ChatOpenAI } from '@langchain/openai'

export interface ProgramOptions {
  width?: number
  height?: number
}

export async function generate(openai: ChatOpenAI, prompt: string, options: ProgramOptions) {
  const callback = await openai.invoke([
    systemMessage,
    frequencyMistake,
    new SystemMessage(`Known that the width of the canvas is ${options.width ?? 1600}, the height is ${options.height ?? 900}`),
    new HumanMessage(prompt)
  ])
  return callback.content.toString().replace(/```json/, '').replace(/```$/, '')
}

export * from './llms/openai'

export * from './prompts/core'