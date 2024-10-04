<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="ion-text-center">
          <ion-title>Owphiyr Smart Home</ion-title>
        </div>
        <ion-buttons slot="end">
          <ion-button @click="logout" fill="clear" color="light"
            ><ion-icon :icon="logOutOutline" size="large"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <div class="ion-text-center">
              <ion-icon class="title" :icon="warning"></ion-icon>
              <h3>E-mail não verificado!</h3>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="sendNewEmailVerification"
              >Enviar nova solicitação</ion-button
            >
          </ion-col>
        </ion-row>
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

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonGrid,
  IonButtons,
  IonIcon,
  IonButton,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonHeader,
  loadingController,
  useIonRouter,
} from '@ionic/vue'
import { warning, logOutOutline } from 'ionicons/icons'
import { useApi } from '@/api'

const ionRouter = useIonRouter()
const api = useApi(ionRouter)

const sendNewEmailVerification = async () => {
  const loading = await loadingController.create({
    message: 'Enviando nova solicitação de e-mail...',
  })

  try {
    loading.present()
    await api.get('/sanctum/csrf-cookie')
    await api.post('/api/v1/email/verification-notification')
  } catch (error) {
    console.error(error)
  } finally {
    loading.dismiss()
  }
}

const logout = async () => {
  const loading = await loadingController.create({
    message: 'Saindo...',
  })

  try {
    loading.present()
    await api.get('/sanctum/csrf-cookie')
    await api.post('/api/v1/users/logout')
  } catch (error) {
    console.error(error)
  } finally {
    loading.dismiss()
  }
}
</script>

<style scoped>
.title {
  font-size: 8rem;
  color: var(--ion-color-warning);
}
</style>
