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
    component: () => import('@/views/live_manage')
  },
  {
    path: '/challenge',
    name:'challenge',
    component: () => import('@/views/image_challenge_manage')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
