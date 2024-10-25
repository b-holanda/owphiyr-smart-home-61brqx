import { createMemoryHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { authenticated } from './guards'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
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
  {
    path: '/oauth/callback',
    name: 'oauth-callback',
    component: () => import('@/views/OAuthCallbackPage.vue'),
  },
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
