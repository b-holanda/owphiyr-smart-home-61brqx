import { createApp } from 'vue'
import AppVue from './App.vue'
import router from './router'
import { storageService } from '@/storage'

import { IonicVue } from '@ionic/vue'
import { App, URLOpenListenerEvent } from '@capacitor/app'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css'

const app = createApp(AppVue).use(IonicVue).use(router)

router.isReady().then(() => {
  app.mount('#app')
})

App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  const path = new URL(event.url).pathname
  const search = new URL(event.url).search

  if (path) {
    console.debug('Redirecting to:', `${path}`)
    console.debug('Search :', `${search}`)

    const query = search
      ?.replaceAll('?', '')
      .split('&')
      .map((q) => {
        const [key, value] = q.split('=')
        return { [key]: value }
      })
      .reduce((acc, curr) => {
        return { ...acc, ...curr }
      }, {})

    router.push({ path, query })
  }
})

storageService.init()
