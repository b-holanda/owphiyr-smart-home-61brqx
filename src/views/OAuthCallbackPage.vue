<script setup lang="ts">
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from '@ionic/vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storageService } from '@/storage'
import { useApi } from '@/api'

const router = useRouter()
const route = useRoute()
const api = useApi()

onMounted(async () => {
  const code = route.query.code
  const state = route.query.state?.toString()
  const localState = await storageService.get('state')

  if (state !== localState) {
    router.push('/')
    return
  }

  const { access_token } = await api.post('/oauth/token', {
    grant_type: 'authorization_code',
    client_id: process.env.VITE_API_CLIENT_ID,
    client_secret: process.env.VITE_API_CLIENT_SECRET,
    redirect_uri: 'https://app.owphiyr.com.br/oauth/callback',
    code,
  })

  await storageService.set('token', access_token)

  router.push('/')
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="ion-text-center">
          <ion-title>Owphiyr Smart Home</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <div class="ion-text-center">
              <h3>Autenticado com sucesso!</h3>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <div class="ion-text-center">
              <ion-text color="success">
                Estamos redirecionando você para a página inicial.
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-col>
          <ion-row>
            <ion-spinner color="primary"></ion-spinner>
          </ion-row>
        </ion-col>
      </ion-grid>
    </ion-content>
    <ion-footer collapse="fade">
      <ion-toolbar>
        <ion-title size="small">
          <div class="ion-text-center">
            <p>© {{ new Date().getFullYear() }} Owphiyr</p>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
