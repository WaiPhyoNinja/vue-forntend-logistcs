import { createRouter, createWebHistory } from 'vue-router'
import Index from '../components/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  // Add more routes here as needed
  // Example:
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../components/About.vue')
  // },
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   component: () => import('../components/Contact.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router