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
    new HumanMessage(prompt),
    new HumanMessage('请不要生成除了json文件以外任何的文本！'),
  ])
  return callback.content.toString().replace(/(.+)?```json/, '').replace(/```(.+)?$/, '')
}
