import { ChatBaiduQianfan } from '@langchain/baidu-qianfan'
import { ProgramOptions } from './interfaces'
import { HumanMessage } from '@langchain/core/messages'
import { template as core } from '../prompts/core'
import { template as fm } from '../prompts/frequency-mistake'
import { template as math } from '../prompts/mod-math'
import { template as layout } from '../prompts/mod-layout'
import { template as skills } from "../prompts/skills"

export function createVisionAppBasedOnBaiduQianfan(options: any) {
  return new ChatBaiduQianfan(options)
}

export async function generateByBaiduQianfan(llm: ChatBaiduQianfan, prompt: string, options: ProgramOptions) {
  options.mods ??= {}
  const mods = []
  if (options.mods.math) {
    mods.push(
      new HumanMessage(math)
    )
  }
  if (options.mods.layout) {
    mods.push(
      new HumanMessage(layout)
    )
  }

  const callback = await llm.invoke([
    new HumanMessage(core),
    ...mods,
    new HumanMessage(`Known that the width of the canvas is ${options.width ?? 1600}, the height is ${options.height ?? 900}, the background color is black.`),
    new HumanMessage(fm),
    new HumanMessage(skills),
    new HumanMessage(prompt),
  ])
  return (callback.content.toString().match(/```json.+```/s) as RegExpExecArray)[0]
    .replace(/```json/, '')
    .replace(/```$/, '')
    .replace(/\/\/.*(?=[\n\r])/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
}
