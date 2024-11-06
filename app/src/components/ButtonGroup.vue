<script setup lang="ts">
const emit = defineEmits(['submit', 'download']);

const handleSubmit = () => {
  emit('submit');
};

const handleDownload = () => {
  emit('download');
};
</script>

<template>
  <div class="button-group">
    <button class="action-button submit-button" @click="handleSubmit">
      <span class="button-text">提交</span>
    </button>
    <button class="action-button download-button" @click="handleDownload">
      <span class="button-text">下载</span>
    </button>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: center;
}

.action-button {
  padding: 10px 32px;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.submit-button {
  background-color: var(--theme-color);
  color: white;
}

.submit-button:hover {
  box-shadow: 0 0 30px rgba(var(--theme-color-rgb), 0.4);
  transform: translateY(-1px);
}

.download-button {
  background-color: white;
  color: var(--theme-color);
  border: 2px solid var(--theme-color);
}

.download-button:hover {
  background-color: var(--theme-color);
  color: white;
  box-shadow: 0 0 30px rgba(var(--theme-color-rgb), 0.4);
  transform: translateY(-1px);
}

.button-text {
  font-family: inherit;
}
</style>
