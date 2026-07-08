import './assets/main.css'
import './assets/utilities.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastService from "primevue/toastservice"
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(router)
app.use(ToastService)

// Theming can be customised using SASS (https://v3.primevue.org/theming/#customtheme) or chosen from a preset (https://v3.primevue.org/theming/#builtinthemes) 
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')