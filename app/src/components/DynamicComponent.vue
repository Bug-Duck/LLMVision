<template>
  <div class="dynamic-component">
    <component :is="animation" v-if="true" class="full-size-svg"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createLLAMotionClient } from 'llamotion-sdk'
import Cookies from 'js-cookie'

const client = createLLAMotionClient({
  apiKey: Cookies.get('apiKey')!,
  model: 'ft:gpt-4o-mini-2024-07-18:personal::AaPkVTc6',
})

const props = defineProps<{
  prompt?: string
}>()

const animation = ref()
const requestNewAnimation = async (prompt: string | undefined = props.prompt) => {
  if (!prompt) {
    throw new Error('Prompt is required')
  }
  animation.value = await client.requestAsComponent(prompt)
}

// Expose the method to parent component
defineExpose({
  requestNewAnimation
})

onMounted(async () => {
  await requestNewAnimation()
})
</script>

<style scoped>
.dynamic-component {
  width: 400px;
  height: 300px;
  background-color: black;
  color: white;
  overflow: auto;
}

.full-size-svg {
  width: 100%;
  height: 100%;
}

template {
  display: block;
}
</style>
