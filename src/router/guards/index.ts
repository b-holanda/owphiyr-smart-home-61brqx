import { storageService } from '@/storage'

export const authenticated = async () => {
  const isAuthenticated = (await storageService.get('token')) !== null
  if (!isAuthenticated) {
    return { path: '/login' }
  }
}

export const redirectIfAuthenticated = async () => {
  const isAuthenticated = (await storageService.get('token')) !== null
  if (isAuthenticated) {
    return { path: '/home' }
  }
}
