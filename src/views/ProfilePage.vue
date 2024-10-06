<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="ion-text-center">
          <ion-title>Perfil</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-avatar>
        <img
          alt="Silhouette of a person's head"
          src="https://ionicframework.com/docs/img/demos/avatar.svg"
        />
      </ion-avatar>
      <ion-item>
        <ion-label class="ion-text-center">
          <h1>{{ user.name }}</h1>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label class="ion-text-center">
          <h2>{{ user.email }}</h2>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonHeader,
  toastController,
  IonAvatar,
  IonItem,
  IonLabel,
} from '@ionic/vue'
import { useApi } from '@/api'
import { authStore } from '@/store/auth/auth.store'
import { ref, onMounted } from 'vue'
import { User } from '@/models'

const api = useApi()
const user = ref<User>({ email: '', name: '' })

onMounted(async () => {
  if (authStore.emailVerificationMessage) {
    const toast = await toastController.create({
      message: authStore.emailVerificationMessage,
      duration: 5000,
      position: 'top',
    })

    toast.present()

    authStore.emailVerificationMessage = ''
  }

  try {
    await api.get('/sanctum/csrf-cookie')

    const response = await api.get('/api/v1/users')

    user.value = response.data.data as User
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped>
ion-avatar {
  width: 125px;
  height: 125px;
  margin: 0 auto;
}
</style>
