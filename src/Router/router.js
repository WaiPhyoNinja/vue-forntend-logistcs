import { createRouter, createWebHistory } from 'vue-router'
import Index from '../components/index.vue'
import Login from '../components/auth/Login.vue'
import MyAccount from '../components/MyAccount.vue'
import ResetPassword from '../components/ResetPassword.vue'
import { useAuth } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: { requiresAuth: true }
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: MyAccount,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Index,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Index,
    meta: { requiresAuth: true }
  },
  {
    path: '/:slug',
    name: 'DynamicPage',
    component: Index
  },
  {
    path: '/:parent/:slug',
    name: 'NestedPage',
    component: Index
  },
  {
    path: '/:parent/:child/:slug',
    name: 'DeepNestedPage',
    component: Index
  }
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

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, checkAuth } = useAuth()
  
  // Check authentication status
  await checkAuth()
  
  // Redirect to home if logged in user tries to access login page
  if (to.meta.requiresGuest && isAuthenticated.value) {
    next('/')
  }
  // Redirect to login if guest tries to access protected route
  else if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login')
  }
  // Proceed normally
  else {
    next()
  }
})

export default router