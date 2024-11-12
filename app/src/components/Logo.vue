<script setup lang="ts">
// 空的 setup 脚本以满足单文件组件要求
</script>

<template>
  <img 
    src="https://raw.githubusercontent.com/Bug-Duck/vuemotion/master/assets/logo.svg"
    alt="Logo"
    class="logo"
  />
</template>

<style scoped>
.logo {
  width: 120px;
  height: auto;
  margin-bottom: 24px;
  user-select: none;
  filter: drop-shadow(0 0 8px rgba(var(--theme-color-rgb), 0.3));
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 8px rgba(var(--theme-color-rgb), 0.3));
  }
  to {
    filter: drop-shadow(0 0 15px rgba(var(--theme-color-rgb), 0.6));
  }
}
</style>
