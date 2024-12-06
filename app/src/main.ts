import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { llamotion } from 'llamotion-sdk';
import * as Vue from 'vue'
(window as any).Vue = Vue

library.add(faCog);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(llamotion())
app.mount('#app');
