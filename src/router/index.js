import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/manage',
    name: 'manage',
    component: () => import('@/views/manage')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
