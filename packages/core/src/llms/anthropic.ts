import { ChatAnthropicMessages, AnthropicInput } from "@langchain/anthropic"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { template as core } from '../prompts/core'
import { template as fm } from '../prompts/frequency-mistake'
import { template as math } from '../prompts/mod-math'
import { template as skills } from "../prompts/skills"
import { template as layout } from '../prompts/mod-layout'
import { ProgramOptions } from "./interfaces"

export function createVisionAppBasedOnAnthropic(messages: AnthropicInput) {
  return new ChatAnthropicMessages(messages)
}

export async function generateByAnthropic(llm: ChatAnthropicMessages, prompt: string, options: ProgramOptions) {
  options.mods ??= {}
  const mods = []
  if (options.mods.math) {
    mods.push(math)
  }
  if (options.mods.layout) {
    mods.push(layout)
  }

  const callback = await llm.invoke([
    new SystemMessage(core + mods.join('/n/n') + `Known that the width of the canvas is ${options.width ?? 1600}, the height is ${options.height ?? 900}, the background color is black.` + '\n\n' + fm + '\n' + skills + mods.join('\n')),
    new HumanMessage(prompt),
  ])
  return (callback.content.toString().match(/```json.+```/s) as RegExpExecArray)[0]
  .replace(/```json/, '')
  .replace(/```$/, '')
  .replace(/\/\/.*(?=[\n\r])/g, '')
  .replace(/\/\*[\s\S]*?\*\//g, '')
}
