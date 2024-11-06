<script setup lang="ts">
// 空的 setup 脚本以满足单文件组件要求
</script>

<template>
  <div></div>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, 
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: white;
}

@keyframes colorful-shadow {
  0% {
    box-shadow: 
      0 0 20px rgba(147, 51, 234, 0.6),
      0 0 40px rgba(59, 130, 246, 0.6),
      0 0 60px rgba(236, 72, 153, 0.6);
  }
  33% {
    box-shadow: 
      0 0 40px rgba(16, 185, 129, 0.6),
      0 0 60px rgba(245, 158, 11, 0.6),
      0 0 20px rgba(147, 51, 234, 0.6);
  }
  66% {
    box-shadow: 
      0 0 60px rgba(59, 130, 246, 0.6),
      0 0 20px rgba(236, 72, 153, 0.6),
      0 0 40px rgba(16, 185, 129, 0.6);
  }
  100% {
    box-shadow: 
      0 0 20px rgba(147, 51, 234, 0.6),
      0 0 40px rgba(59, 130, 246, 0.6),
      0 0 60px rgba(236, 72, 153, 0.6);
  }
}
</style>
