<template>
  <div class="dynamic-component" v-html="componentHtml"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ componentHtml: string }>();

const componentHtml = ref(props.componentHtml);

watch(() => props.componentHtml, (newHtml) => {
  componentHtml.value = newHtml;
});
</script>

<style scoped>
.dynamic-component {
  width: 400px;
  height: 300px;
  background-color: black;
  color: white;
  overflow: auto;
}
</style>
