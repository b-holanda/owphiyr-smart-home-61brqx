<template>
  <ion-page>
    <ion-content class="ion-padding"></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useApi } from '@/api'
import { IonContent, IonPage, loadingController } from '@ionic/vue'
import { useRouter, useRoute } from 'vue-router'
import { authStore } from '@/store/auth/auth.store'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const apt = useApi()
onMounted(async () => {
  const loading = await loadingController.create({
    message: 'Estamos ativando seu usuário...',
  })

  try {
    loading.present()

    await apt.get('/sanctum/csrf-cookie')

    console.debug('token', route.params.token)
    console.debug('api validation email', atob(route.params.token as string))

    await apt.get(atob(route.params.token as string))

    router.replace('/home')
    authStore.emailVerificationMessage = 'Usuário ativado com sucesso.'
  } catch (error) {
    console.error(error)
    router.replace('/not-verified-email')
    authStore.emailVerificationMessage =
      'Não foi possível ativar seu usuário. Tente novamente.'
  } finally {
    loading.dismiss()
  }
})
</script>

<style scoped></style>
