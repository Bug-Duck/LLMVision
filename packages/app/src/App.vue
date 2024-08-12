<script setup lang="ts">
import { generateByZhipuAI, createVisionAppBasedOnZhipuAI, createVisionAppBasedOnOpenAI, generateByOpenAI } from '@llmvision/core'
import * as nc from 'newcar'
import { importScene } from '@newcar/json'
import { ref, watch } from 'vue'
import { codeToHtml } from 'shiki'

const model = ref('gpt-3.5')
const api = ref(document.cookie)

const content = ref()
const canvas = ref()

const codeHtml = ref('')

const width = ref(1600)
const height = ref(900)

const dialogOpen = ref(false)
const messages = ref()
watch(dialogOpen, (open) => {
  if (open) {
    setTimeout(() => {
      dialogOpen.value = false
    }, 6000)
  }
})

const generating = ref(false)

let app: nc.App

async function gen(message: string) {
  document.cookie = api.value
  await nc.useFont('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')
  let llm: any
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
  }
  
  generating.value = true
  const engine = await new nc.CarEngine()
    .init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  console.log('engine initialized!')
  let json: string = ''
  switch (model.value) {
    case 'gpt-4':
      json = await generateByOpenAI(llm, message, {
        width: width.value,
        height: height.value,
      })
      break
    case 'glm-3':
    case 'glm-4':
      json = await generateByZhipuAI(llm, message, {
        width: width.value,
        height: height.value,
      })
  }
  generating.value = false
  app = engine.createApp(canvas.value)
  console.log(json)
  try {
    const scene = importScene(json, nc as any, nc as any, nc as any)
    app.checkout(scene)
    scene.elapsed = 0
    app.play()
  } catch (err) {
    messages.value = err
    dialogOpen.value = true
  }
  codeHtml.value = await codeToHtml(json, {
    lang: 'json',
    theme: 'vitesse-dark',
  })
  generating.value = false
}
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden">
    <div class="flex flex-row w-full h-12 border">
      <div class="float-left">
        <img class="w-10 h-10 pt-1">
      </div>
      <div class="h-full flex justify-center items-center pl-5 float-left">
        <div class="text-2xl font-mono float-left">LLM Vision</div>
      </div>
      <div class="absolute right-2 top-3">
        <div class="text-xl font-mono text-sky-300"><a href="https://github.com/Bug-Duck/LLMVision">GitHub</a></div>
      </div>
    </div>
    <div class="flex flex-row w-full h-full">
      <div class="border flex flex-col md:w-7/12 sm:w-full">
        <div class="h-3/5 border-b flex items-center justify-center">
          <canvas
            :width="Number(width)"
            :height="Number(height)"
            class="bg-black w-full h-auto max-w-full max-h-full"
            ref="canvas"
            :style="{
              aspectRatio: `${width} / ${height}`,
            }"
          ></canvas>
        </div>
        <div class="h-2/5 border-t">
          <div class="m-5">
            <textarea class="border rounded-lg resize-none w-full h-32" v-model="content"></textarea>
            <button class="border rounded-lg w-28 h-8 bg-white float-right hover:bg-gray-200 select-none" @click="gen(content)" v-if="!generating">Generate</button>
            <button class="border rounded-lg w-28 h-8 float-right bg-gray-200 select-none" disabled="true" v-if="generating">Generating...</button>
            <button class="border rounded-lg w-28 h-8 bg-white float-left hover:bg-gray-200 select-none" @click="app.play(0)">Replay</button>
          </div>
        </div>
      </div>
      <div class="border md:w-5/12 sm:block overflow-y-scroll">
        <div class="m-5">
          <div class="py-3">
            <h1 class="font-mono">Model</h1>
            <select class="border rounded-lg w-full h-8 bg-white" v-model="model">
              <!-- <option value="gpt-3.5">GPT-3.5</option> -->
              <option value="gpt-4">GPT-4</option>
              <option value="glm-3">GLM-3</option>
              <option value="glm-4">GLM-4</option>
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
