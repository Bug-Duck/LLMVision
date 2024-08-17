<script setup lang="ts">
import { generateByZhipuAI, createVisionAppBasedOnZhipuAI, createVisionAppBasedOnOpenAI, generateByOpenAI, generateByAnthropic, createVisionAppBasedOnAnthropic } from '@llm-vision/core'
import * as nc from 'newcar'
import * as math from '@newcar/mod-math'
import { importScene } from '@newcar/json'
import { ref, watch } from 'vue'
import { codeToHtml } from 'shiki'
import config from './config'
import { exportToVideo } from './export'

const model = ref('gpt-3.5')
const api = ref(document.cookie)

const content = ref()
const canvas = ref()

const codeHtml = ref('')

const width = ref(1600)
const height = ref(900)

const dialogOpen = ref(false)
const messages = ref()

const exports = ref(false)
const couldDownload = ref(false)
const download = ref('')

const fps = ref(60)
const duration = ref(10)

watch(dialogOpen, (open) => {
  if (open) {
    setTimeout(() => {
      dialogOpen.value = false
    }, 6000)
  }
})

const generating = ref(false)

let app: nc.App

async function exportOut(duration: number, fps: number) {
  try {
    exports.value = true
    download.value = await exportToVideo(app, duration, fps)
    couldDownload.value = true
    exports.value = false
  } catch (e) {
    exports.value = false
    messages.value = e
    console.error(e)
  }
}

async function gen(message: string) {
  try {
    document.cookie = api.value
    generating.value = false
    await nc.useFont('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')
    let llm: any
    if (config.mode === 'browser') {
      switch (model.value) {
        case 'gpt-4':
          llm = createVisionAppBasedOnOpenAI({
            openAIApiKey: api.value,
            model: 'gpt-4'
          })
          break
        case 'glm-3':
          llm = createVisionAppBasedOnZhipuAI({
            modelName: 'glm-3-turbo',
            model: 'glm-3-turbo',
            zhipuAIApiKey: api.value,
          })
          break
        case 'glm-4':
          llm = createVisionAppBasedOnZhipuAI({
            modelName: 'glm-4',
            model: 'glm-4',
            zhipuAIApiKey: api.value,
          })
          break
        case 'glm-4-0520':
          llm = createVisionAppBasedOnZhipuAI({
            modelName: 'glm-4-0520',
            model: 'glm-4-0520',
            zhipuAIApiKey: api.value,
          })
          break
        case 'claude-3':
          llm = createVisionAppBasedOnAnthropic({
            anthropicApiKey: api.value,
            model: 'claude-3',
          })
          break
      }
    }
    generating.value = true
    const engine = await new nc.CarEngine()
      .init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
    console.log('engine initialized!')
    let json: string = ''
    if (config.mode === 'browser') {
      switch (model.value) {
        case 'gpt-4':
          json = await generateByOpenAI(llm, message, {
            width: width.value,
            height: height.value,
            mods: {
              math: getStatus().Mathematics
            }
          })
          break
        case 'glm-3':
        case 'glm-4':
        case 'glm-4-0520':
          json = await generateByZhipuAI(llm, message, {
            width: width.value,
            height: height.value,
            mods: {
              math: getStatus().Mathematics
            }
          })
          break
        case 'claude-3':
          json = await generateByAnthropic(llm, message, {
            width: width.value,
            height: height.value,
            mods: {
              math: getStatus().Mathematics
            }
          })
      }
    } else if (config.mode === 'server') {
      json = await (await fetch(`${config.backend}/generate/${model.value}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: message,
          options: {
            width: width.value,
            height: height.value,
            mods: {
              math: getStatus().Mathematics,
              layout: getStatus().Layout,
            }
          },
          key: api.value
        }),
        method: 'POST',
      })).text()
    }
    app = engine.createApp(canvas.value)
    console.log(json)

    const scene = importScene(json, {
      ...(nc as any),
      ...math
    }, {
      ...(nc as any),
      ...math
    }, {
      ...(nc as any),
      ...math
    })
    app.checkout(scene as unknown as nc.Scene)
    scene.elapsed = 0
    app.play()
    codeHtml.value = await codeToHtml(json, {
      lang: 'json',
      theme: 'vitesse-dark',
    })
    generating.value = false
  } catch (err) {
    messages.value = err
    dialogOpen.value = true
    generating.value = false
    console.error(err)
  }
}

const modsList = ref([
  'Mathematics',
  'Chart (going to be supported soon)',
  'Table (going to be supported soon)',
  'Layout',
  'Geometry (going to be supported soon)',
  'Skottie (going to be supported soon)',
  'SVG (going to be supported soon)',
  'Markdown (going to be supported soon)',
])

function getStatus() {
  const result: Record<string, boolean> = {}
  for (const key of modsList.value) {
    if ((document.getElementById(key) as HTMLInputElement).checked) {
      result[key] = true
    }
  }

  return result
}
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden">
    <div class="flex flex-row w-full h-12 border">
      <div class="float-left">
        <img class="w-10 h-10 pt-1" src="/llmvision.svg">
      </div>
      <div class="h-full flex justify-center items-center pl-5 float-left">
        <div class="text-2xl font-mono float-left">LLM Vision</div>
      </div>
      <div class="absolute right-2 top-3">
        <div class="text-xl font-mono text-sky-300"><a href="https://github.com/Bug-Duck/LLMVision">GitHub</a></div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row w-full h-full md:overflow-hidden overflow-y-auto">
      <div class="flex flex-col md:w-7/12 sm:w-full md:border">
        <div class="h-3/5 md:border-b flex items-center justify-center">
          <canvas :width="Number(width)" :height="Number(height)" class="bg-black w-full h-auto max-w-full max-h-full"
            ref="canvas" :style="{
              aspectRatio: `${width} / ${height}`,
            }"></canvas>
        </div>
        <div class="h-2/5 md:border-t">
          <div class="m-5">
            <textarea class="border rounded-lg resize-none w-full h-32" v-model="content"></textarea>
            <button class="border rounded-lg w-28 h-8 bg-white float-right hover:bg-gray-200 select-none"
              @click="gen(content)" v-if="!generating">Generate</button>
            <button class="border rounded-lg w-28 h-8 float-right bg-gray-200 select-none" disabled="true"
              v-if="generating">Generating...</button>
            <button class="border rounded-lg w-28 h-8 bg-white float-left hover:bg-gray-200 select-none"
              @click="app.play(0)">Replay</button>
          </div>
        </div>
      </div>
      <div class="md:w-5/12 md:overflow-y-scroll sm:w-full sm:overflow-y-auto p-0 md:border">
        <div class="m-5">
          <div class="py-3">
            <h1 class="font-mono">Model</h1>
            <select class="border rounded-lg w-full h-8 bg-white" v-model="model">
              <option value="gpt-4">GPT-4</option>
              <option value="glm-3">GLM-3</option>
              <option value="glm-4">GLM-4</option>
              <option value="glm-4-0520">GLM-4-0520</option>
              <option value="claude-3">Claude-3</option>
              <option value="claude-3.5">Claude-3.5</option>
            </select>
          </div>
          <div class="py-3">
            <h1 class="font-mono">Your API Key</h1>
            <input class="border rounded-lg w-full h-8 bg-white" v-model="api">
          </div>
          <div class="py-3 flex flex-row">
            <div class="w-1/2 pr-2">
              <h1 class="font-mono">Width</h1>
              <input class="border rounded-lg w-full h-8 bg-white" v-model="width" value="1600">
            </div>
            <div class="w-1/2 pr-2">
              <h1 class="font-mono">Height</h1>
              <input class="border rounded-lg w-full h-8 bg-white" v-model="height" value="900">
            </div>
          </div>
          <div class="py-3 flex flex-col">
            <div class="flex flex-wrap">
              <div v-for="(mod, index) in modsList" :key="index" class="w-1/2 p-2" ref="exportButton">
                <label>
                  <input type="checkbox" :id="mod">
                  {{ mod }}
                </label>
              </div>
            </div>
          </div>
          <div class="py-3 flex flex-row">
            <div class="w-1/3 pr-2">
              <h1 class="font-mono">FPS</h1>
              <input class="border rounded-lg w-full h-8 bg-white" v-model="fps" value="1600">
            </div>
            <div class="w-1/3 pr-2">
              <h1 class="font-mono">Duration</h1>
              <input class="border rounded-lg w-full h-8 bg-white" v-model="duration" value="900">
            </div>
            <div class="w-1/3 pr-2">
              <button class="border rounded-lg w-full h-8 bg-white" value="900" :disabled="exports"
                @click="exportOut(duration, fps)" :class="{
                  'bg-gary-200': exports
                }">{{ exports ? 'Exporting...' : 'Export' }}</button>
              <h1 class="font-mono text-sky-300" v-if="couldDownload"><a type="download" :href="download">Download</a>
              </h1>
            </div>
          </div>
          <div class="py-3 flex flex-row">
            <div v-html="codeHtml" class="w-full border-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-2 right-2 border rounded-lg w-1/4 h-1/4" v-if="dialogOpen">
    <div class="flex self-center items-center justify-center h-full bg-white">
      {{ messages }}
    </div>
  </div>
</template>
