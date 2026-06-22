import './assets/main.css'
import './assets/utilities.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'primevue/toast';

const app = createApp(App)

app.use(router)
app.use(Toast)

app.mount('#app')
