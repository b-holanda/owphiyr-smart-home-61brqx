import axios from 'axios'
import { storageService } from '@/storage'
import { Token } from '@/models'
import { UseIonRouterResult } from '@ionic/vue'

const instance = axios.create({
  baseURL: 'https://smart.owphiyr.com.br',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'API-BASIC':
        'cWtFWUh1Vjk2RmM4S2J2RkdicnlKRDIyWllFZkY1YUsgICRXezJOXVdVXT1yNjgyOmpdelM2VDpnZ3p9aSpbcXFGMTBrZCx7LCh1UkxjYkZILUU2IUguP3hDWi8wZDVFKGY=',
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

export const useApi = (ionRouter: UseIonRouterResult) => {
  instance.interceptors.request.use(async (config) => {
    if (config.url === '/api/v1/users/logout') {
      storageService.remove('token')
      ionRouter.replace({ name: 'login' })
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
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        storageService.remove('token')
        ionRouter.replace({ name: 'login' })
      }

      if (
        error?.response?.status === 403 &&
        error?.response?.data?.message === 'Your email address is not verified.'
      ) {
        ionRouter.replace({ name: 'not-verified-email' })
      }

      return Promise.reject(error)
    }
  )

  return instance
}
