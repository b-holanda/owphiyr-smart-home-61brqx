<template>
  <ion-page>
    <ion-content class="ion-padding"></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, useIonRouter } from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useApi } from '@/api'

const user = ref({})

const ionRouter = useIonRouter()

const api = useApi(ionRouter)

onMounted(async () => {
  try {
    await api.get('/sanctum/csrf-cookie')

    user.value = await api.get('/api/v1/users')

    console.log(user.value)
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
