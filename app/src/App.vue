<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import DynamicComponent from './components/DynamicComponent.vue';
import SettingsModal from './components/SettingsModal.vue';
import ButtonGroup from './components/ButtonGroup.vue';
import Logo from './components/Logo.vue';
import AppStyles from './components/AppStyles.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Cookies from 'js-cookie';

import { faCog } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { hexToRgb } from './utils/color';

library.add(faCog);

const apiKey = ref(Cookies.get('apiKey') || '');
const description = ref('');
const showModal = ref(false);
const themeColor = ref(Cookies.get('themeColor') || '#00B74A');

const focusInput = ref(false);

const setSettings = (settings: { key: string; themeColor: string }) => {
  apiKey.value = settings.key;
  themeColor.value = settings.themeColor;
  Cookies.set('apiKey', settings.key, { expires: 365 });
  Cookies.set('themeColor', settings.themeColor, { expires: 365 });
};

watch(themeColor, (newColor) => {
  document.documentElement.style.setProperty('--theme-color', newColor);
  // 转换 hex 为 rgb 并设置
  const rgb = hexToRgb(newColor);
  if (rgb) {
    document.documentElement.style.setProperty('--theme-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
});

const DEFAULT_THEME_COLOR = '#00B74A';

onMounted(() => {
  const storedColor = Cookies.get('themeColor');
  if (!storedColor) {
    themeColor.value = DEFAULT_THEME_COLOR;
    Cookies.set('themeColor', DEFAULT_THEME_COLOR, { expires: 365 });
  } else {
    themeColor.value = storedColor;
  }
  document.documentElement.style.setProperty('--theme-color', themeColor.value);
  // 设置 RGB 值
  const rgb = hexToRgb(themeColor.value);
  if (rgb) {
    document.documentElement.style.setProperty('--theme-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
});

// 添加按钮处理方法
const isRotating = ref(false);

// Add ref for DynamicComponent
const dynamicComponentRef = ref()

const handleSubmit = async () => {
  isRotating.value = true;
  // Pass the description as prompt
  await dynamicComponentRef.value?.requestNewAnimation(description.value);
  setTimeout(() => {
    isRotating.value = false;
  }, 2000);
};

const handleDownload = () => {
  // 处理下载逻辑
  console.log('下载组件');
};
</script>

<template>
  <AppStyles />
  <div class="app-container">
    <Logo />
    <div class="content-wrapper">
      <textarea
        v-model="description"
        placeholder="输入描述"
        class="input-field"
        :class="{ 'input-field--expanded': focusInput }"
        @focus="focusInput = true"
        @blur="focusInput = false"
      ></textarea>
      
      <ButtonGroup 
        @submit="handleSubmit"
        @download="handleDownload"
      />

      <DynamicComponent
        ref="dynamicComponentRef"
        :prompt="description"
        class="dynamic-component"
        :class="{ 'rotating': isRotating }"
      />
      
      <font-awesome-icon :icon="['fas', 'cog']" class="settings-icon" @click="showModal = true" />
    </div>
    
    <div v-if="showModal" class="modal-overlay"></div>
    <SettingsModal v-if="showModal" @close="showModal = false" @save="setSettings" />
  </div>
</template>

<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 32px 0;
  margin: 0;
  box-sizing: border-box;
}

.settings-icon {
  margin-top: 50px;
  cursor: pointer;
  font-size: 24px;
  background: white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  color: var(--theme-color);
  transition: box-shadow 0.3s ease;
  z-index: 1;
}

.settings-icon:hover {
  box-shadow: 0 0 30px rgba(var(--theme-color-rgb), 0.72);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2; /* 遮罩层高于按钮 */
}

:deep(.settings-modal) {
  z-index: 3; /* 确保模态框在最顶层 */
}


/* 修改 .input-field 样式 */
.input-field {
  width: 100%; /* 宽度占满容器 */
  margin-bottom: 20px;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 24px; /* 增大圆角半径 */
  background-color: #fff;
  resize: none; /* 禁用手动调整大小 */
  overflow: hidden; /* 隐藏滚动条 */
  line-height: 1.5;
  height: 40px; /* 初始高度 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); /* 略微增加默认状态的阴影强度 */
  transition: height 0.3s ease, box-shadow 0.3s ease; /* 添加 box-shadow 过渡效果 */
  text-align: left; /* 文本左对齐 */
  vertical-align: top; /* 文本顶部对齐 */
  font-family: inherit; /* 继承父元素的字体设置 */
}

.input-field:focus {
  outline: none;
  box-shadow: 0 0 30px rgba(var(--theme-color-rgb), 0.72); /* 增大模糊半径和不透明度 */
  border-radius: 24px; /* 聚焦时进一步增大圆角，使其与阴影效果更协调 */
}

.input-field--expanded {
  height: 150px; /* 获取焦点时的高度，可根据需要调整 */
}

/* 修改动态组件样式 */
.dynamic-component {
  width: 100%;
  margin-top: 32px; /* 增大与上方组件的距离 */
  transition: all 0.3s ease;
  background: white; /* 添加背景色 */
  border-radius: 24px; /* 添加圆角 */
  padding: 20px; /* 添加内边距 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dynamic-component:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 悬停时增强阴影效果 */
}

/* 移除之前的margin-top相关样式 */
.input-field--expanded + .dynamic-component {
  margin-top: 32px; /* 保持一致的上边距 */
}

/* 优化动画效果 */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 960px; /* 设置最大宽度 */
  margin: 0 auto;
  padding: 16px; /* 增加内边距 */
  box-sizing: border-box;
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (min-width: 600px) {
  .content-wrapper {
    padding: 24px;
  }
}

@media (min-width: 960px) {
  .content-wrapper {
    padding: 32px;
  }
}

.button {
  background: var(--theme-color);
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


/* 添加测试按钮样式 */
.test-action-button {
  position: fixed;
  bottom: 20px;
  padding: 10px 32px;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--theme-color);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.test-action-button:hover {
  box-shadow: 0 0 30px rgba(var(--theme-color-rgb), 0.4);
  transform: translateY(-2px);
}


.rotating {
  animation: colorful-shadow 2s ease-in-out;
}
</style>
