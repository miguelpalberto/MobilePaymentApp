import { createApp } from 'vue'
import App from './App.vue'
import _router from './router';
import config from './utils/config.ts'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './assets/css/main.css';


import axios from 'axios';
const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL


const axiosInstance = axios.create({
  baseURL: serverBaseUrl + '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

const router = _router(axiosInstance)


const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.provide('serverBaseUrl', serverBaseUrl)


app.provide(
    'axios',
    axiosInstance
  )
  

router.isReady().then(() => {
  app.mount('#app');
});

