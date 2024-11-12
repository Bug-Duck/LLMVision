<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <h3>设置</h3>
      <div class="settings-category">
        <h4>API 设置</h4>
        <input v-model="key" placeholder="请输入API Key" class="input-field" />
      </div>
      <div class="settings-category">
        <h4>主题设置</h4>
        <label class="color-label">选择主题颜色：</label>
        <div class="color-options">
          <button 
            v-for="color in presetColors" 
            :key="color" 
            :style="{ backgroundColor: color }" 
            @click="themeColor = color" 
            class="color-option"
            :class="{ 'selected': themeColor === color }"
          ></button>
        </div>
        <input v-model="themeColor" type="color" class="color-picker" />
      </div>
      <div class="modal-actions">
        <button @click="$emit('close')" class="button">取消</button>
        <button @click="saveSettings" class="button">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import Cookies from 'js-cookie';

const key = ref(Cookies.get('apiKey') || '');
const themeColor = ref(Cookies.get('themeColor') || '#5A00EA');
const presetColors = ['#5A00EA', '#03a9f4', '#4caf50', '#ff9800', '#f44336'];

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', payload: { key: string; themeColor: string }): void;
}>();

const saveSettings = () => {
  Cookies.set('apiKey', key.value, { expires: 365 });
  Cookies.set('themeColor', themeColor.value, { expires: 365 });
  emit('save', { key: key.value, themeColor: themeColor.value });
  emit('close');
};

onMounted(() => {
  if (Cookies.get('themeColor')) {
    themeColor.value = Cookies.get('themeColor')!;
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #000;  /* 添加黑色细边框 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  /* 减轻阴影效果 */
  text-align: center;
  width: 300px;
}

.settings-category {
  margin-bottom: 20px;
  text-align: left;
}

.input-field {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;  /* 添加这行来修复右边距问题 */
}

.color-label {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  text-align: left;
}

.color-options {
  display: flex;
  gap: 12px;
  margin: 10px 0;
  flex-wrap: wrap;
}

.color-option {
  width: 36px;
  height: 36px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s, border-color 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  border: 2px solid white;
  box-shadow: 0 0 0 2px var(--theme-color);
}

.color-picker {
  margin-top: 5px;
  width: 100%;
  height: 40px;
  border: none;
  cursor: pointer;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: var(--theme-color);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.8;
}

@media (min-width: 1200px) {
  .modal-container {
    width: 400px;
  }
}
</style>
