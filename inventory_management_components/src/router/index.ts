import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ModalView from '@/views/ModalView.vue'
import TableView from '@/views/TableView.vue'
import PasswordModalVIew from '@/views/PasswordModalVIew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/modal',
      name: 'modal',
      component: ModalView,
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
    },
    {
      path: '/passwordModal',
      name: 'passwordModal',
      component: PasswordModalVIew
    }
  ],
})

export default router
