import { ChatBaiduQianfan } from '@langchain/baidu-qianfan'
import { ProgramOptions } from './interfaces'
import { HumanMessage } from '@langchain/core/messages'
import { template as core } from '../prompts/core'
import { template as fm } from '../prompts/frequency-mistake'

export function createVisionAppBasedOnBaiduQianfan(options: any) {
  return new ChatBaiduQianfan(options)
}

export async function generateByBaiduQianfan(llm: ChatBaiduQianfan, prompt: string, options: ProgramOptions) {
  const callback = await llm.invoke([
    new HumanMessage(core),
    new HumanMessage(`Known that the width of the canvas is ${options.width ?? 1600}, the height is ${options.height ?? 900}, the background color is black.`),
    new HumanMessage(fm),
    new HumanMessage(prompt),
  ])
  return (callback.content.toString().match(/```json.+```/s) as RegExpExecArray)[0].replace(/```json/, '').replace(/```$/, '')
}
