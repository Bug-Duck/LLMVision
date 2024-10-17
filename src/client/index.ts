#!/usr/bin/env node

import { Clerc } from "clerc"
import path from "node:path"
import os from 'node:os'
import fs, { read } from 'node:fs'
import process from "node:process"
import { CacheSet } from "./types"
import { VisionZhipuAI } from "../models"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function readCache(): CacheSet {
  const cache = path.resolve(os.homedir() + '/.llmvision')
  if (!fs.existsSync(cache)) {
    fs.writeFileSync(cache, JSON.stringify({}))
  }
  return JSON.parse(
    fs.readFileSync(cache, 'utf-8')
  ) as CacheSet
}

function setCache(content: string): void {
  fs.writeFileSync(path.resolve(os.homedir() + '/.llmvision'), content)
}

const clerc = Clerc.create('llmvision', 'AI-Powered animation generator based on VueMotion.', '0.1.0')

clerc
  .command('gen', 'Generate animation in a VueMotion project according to description.', {
    parameters: [
      '<desc>'
    ],
    flags: {
      'adjust': {
        type: Boolean,
        description: 'Adjust the animation according to the description.',
        default: true,
        alias: 'a'
      }
    }
  })
  .on('gen', async (context) => {
    const cache = readCache()
    if (typeof cache.base === typeof void 0)
      return console.error('Please set the base of LLM! Command: `llmvision set --base=xxx`')
    if (typeof cache.model === typeof void 0)
      return console.error('Please set the model of LLM! Command: `llmvision set --model=xxx`')
    if (typeof cache.embedding === typeof void 0)
      return console.error('Please set the embedding of LLM! Command: `llmvision set --embedding=xxx`')
    if (typeof cache.key === typeof void 0)
      return console.error('Please set the key of LLM! Command: `llmvision set --key=xxx`')
    
    if (cache.base === 'zhipu_ai') {
      const vision = new VisionZhipuAI()
      await vision.init({
        key: cache.key,
        model: cache.model,
        embeddingsModel: cache.embedding,
        documentPath: path.resolve(__dirname + '/main.md')
      })
      const res = await vision.generate(context.parameters.desc, 1600, 900)
      await vision.operate(res, path.resolve(process.cwd() + '/src'))
    }
  })

  .command('set', 'Set configs', {
    flags: {
      'base': {
        type: String,
        description: 'The source base of LLM for example: `zhipu_ai`'
      },
      'model': {
        type: String,
        description: 'The model of LLM for example: `chatglm3-130b`'
      },
      'embedding': {
        type: String,
        description: 'The embedding of LLM for example: `embedding-3`'
      },
      'key': {
        type: String,
        description: 'The key of LLM for example: `1234567890`'
      }
    }
  })
  .on('set', (context) => {
    const cache = readCache()
    if (typeof context.flags.base !== typeof void 0)
      cache.base = context.flags.base as any
    if (typeof context.flags.model !== typeof void 0)
      cache.model = context.flags.model as any
    if (typeof context.flags.embedding !== typeof void 0)
      cache.embedding = context.flags.embedding as any
    if (typeof context.flags.key !== typeof void 0)
      cache.key = context.flags.key as any
    setCache(JSON.stringify(cache))
  })
  .parse()
