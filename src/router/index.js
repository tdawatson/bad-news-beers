import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('../views/StatsView.vue')
  },
  {
    path: '/stats/:date',
    name: 'game-stats',
    component: () => import('../views/GameStatView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
