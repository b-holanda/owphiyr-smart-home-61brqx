import { Browser } from '@capacitor/browser'
import { storageService } from '@/storage'
import { randomBytes } from 'crypto'
import querystring from 'querystring'

export const authenticated = async () => {
  const isAuthenticated = (await storageService.get('token')) !== null
  if (!isAuthenticated) {
    const state = randomBytes(20).toString('hex')

    await storageService.set('state', state)

    const query = querystring.stringify({
      client_id: import.meta.env.VITE_API_CLIENT_ID,
      redirect_uri: 'https://app.owphiyr.com.br/oauth/callback',
      response_type: 'code',
      scope: 'cipa-all vigia-all user-all',
      state: state,
    })

    await Browser.open({
      url: 'http://smart.owphiyr.com.br/oauth/authorize?' + query,
    })
  }
}
