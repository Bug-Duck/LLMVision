import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { template as core } from '../prompts/core'
import { template as fm } from '../prompts/frequency-mistake'
import { template as math } from '../prompts/mod-math'
import { ProgramOptions } from './interfaces'

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

export async function generateByOpenAI(llm: ChatOpenAI, prompt: string, options: ProgramOptions) {
  options.mods ??= {}
  const mods = []
  if (options.mods.math) {
    mods.push(
      new SystemMessage(math)
    )
  }

  const callback = await llm.invoke([
    new SystemMessage(core),
    ...mods,
    new SystemMessage(`Known that the width of the canvas is ${options.width ?? 1600}, the height is ${options.height ?? 900}, the background color is black.`),
    new SystemMessage(fm),
    new HumanMessage(prompt),
  ])
  return (callback.content.toString().match(/```json.+```/s) as RegExpExecArray)[0]
    .replace(/```json/, '')
    .replace(/```$/, '')
    .replace(/\/\/.*(?=[\n\r])/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
}
