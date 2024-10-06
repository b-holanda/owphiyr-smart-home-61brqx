import axios from 'axios'
import { storageService } from '@/storage'
import { Token } from '@/models'

import router from '@/router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'API-BASIC': import.meta.env.VITE_API_SECRET,
    },
  },
})

storageService.has('token').then((hasToken) => {
  if (hasToken) {
    storageService.get<Token>('token').then((token) => {
      instance.defaults.headers.common['Authorization'] =
        `Bearer ${token.payload}`
    })
  }
})

export const useApi = () => {
  instance.interceptors.request.use(async (config) => {
    console.debug('request', config)

    if (config.url === '/api/v1/users/logout') {
      storageService.remove('token')
      router.replace({ name: 'login' })
    } else {
      if (await storageService.has('token')) {
        storageService.get<Token>('token').then((token) => {
          config.headers.Authorization = `Bearer ${token.payload}`
        })
      }
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => {
      console.debug('response', response)

      return response
    },
    (error) => {
      console.error('error', error)

      if (error?.response?.status === 401) {
        storageService.remove('token')
        router.replace({ name: 'login' })
      }

      if (
        error?.response?.status === 403 &&
        error?.response?.data?.message === 'Your email address is not verified.'
      ) {
        router.replace({ name: 'not-verified-email' })
      }

      return Promise.reject(error)
    }
  )

  return instance
}
