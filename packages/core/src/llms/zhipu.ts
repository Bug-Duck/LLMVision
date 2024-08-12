import { ChatZhipuAI, ChatZhipuAIParams } from '@langchain/community/chat_models/zhipuai'
import { ChatBaiduQianfan } from '@langchain/baidu-qianfan'
import { ProgramOptions } from './interfaces'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { template as core } from '../prompts/core'
import { template as fm } from '../prompts/frequency-mistake'

export function createVisionAppBasedOnZhipuAI(options: ChatZhipuAIParams) {
  return new ChatZhipuAI(options)
}

export async function generateByZhipuAI(llm: ChatZhipuAI, prompt: string, options: ProgramOptions) {
  const callback = await llm.invoke([
    new SystemMessage(core),
    new SystemMessage(`Known that the width of the canvas is ${options.width ?? 1600}, the height is ${options.height ?? 900}, the background color is black.`),
    new SystemMessage(fm),
    new HumanMessage(prompt + ',不要生成除了json数据以外的任何文字!'),
  ])
  return (callback.content.toString().match(/```json.+```/s) as RegExpExecArray)[0]
    .replace(/```json/, '')
    .replace(/```$/, '')
    .replace(/\/\/.*(?=[\n\r])/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
}
