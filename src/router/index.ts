import { createMemoryHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { authenticated, redirectIfAuthenticated } from './guards'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    beforeEnter: [redirectIfAuthenticated],
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterPage.vue'),
    beforeEnter: [redirectIfAuthenticated],
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    beforeEnter: [authenticated],
  },
  {
    path: '/verify-email/:token',
    name: 'verify-email',
    component: () => import('@/views/EmailVerificationPage.vue'),
    beforeEnter: [authenticated],
  },
  {
    path: '/not-verified-email',
    name: 'not-verified-email',
    component: () => import('@/views/EmailNotVerifiedPage.vue'),
    beforeEnter: [authenticated],
  },
  {
    path: '/device/:deviceType/add',
    name: 'device-add',
    component: () => import('@/views/DeviceRegisterPage.vue'),
    beforeEnter: [authenticated],
  },
  {
    path: '/device/:deviceType/enable',
    name: 'device-enable',
    component: () => import('@/views/DeviceEnablePage.vue'),
    beforeEnter: [authenticated],
  },
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
