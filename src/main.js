import { createApp } from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'

createApp(App).use(Toast).use(store).use(router).mount('#app')
