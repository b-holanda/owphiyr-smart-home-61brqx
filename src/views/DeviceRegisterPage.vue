<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="ion-text-center">
          <ion-title>Adicionar {{ route.params.deviceType }}</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-text>Informe os dados da CIPA</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-input
              label="Código"
              label-placement="floating"
              placeholder="Código"
              fill="outline"
              v-model="cipa.code"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-botton">
          <ion-col size="12">
            <ion-input
              label="Chave Secreta"
              label-placement="floating"
              placeholder="Chave secreta"
              fill="outline"
              v-model="cipa.secret"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top">
          <ion-col size="12">
            <ion-text>Informe os dados da sua rede Wi-fi 2.4 Ghz</ion-text>
          </ion-col>
        </ion-row>
        <ion-row></ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-input
              label="Nome da rede Wi-Fi"
              label-placement="floating"
              placeholder="Nome da rede Wi-Fi"
              fill="outline"
              v-model="wifi.ssid"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-input
              label="Senha"
              label-placement="floating"
              placeholder="Digite a senha da rede Wi-Fi"
              type="password"
              fill="outline"
              v-model="wifi.password"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="saveDevice()"
              >Continuar</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button
              expand="block"
              color="tertiary"
              fill="clear"
              @click="router.back()"
              >Voltar</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { DeviceCredentials, Wifi } from '@/models'
import { deviceStore } from '@/store/device/device.store'
import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonInput,
  toastController,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const cipa = ref<DeviceCredentials>({
  code: '',
  secret: '',
})

const wifi = ref<Wifi>({
  ssid: '',
  password: '',
})

onMounted(async () => {
  cipa.value = deviceStore.credentials
  wifi.value = deviceStore.wifi

  if (deviceStore.enableMessage) {
    const toast = await toastController.create({
      message: deviceStore.enableMessage,
      duration: 5000,
      position: 'top',
    })

    toast.present()

    deviceStore.enableMessage = ''
  }
})

const saveDevice = () => {
  deviceStore.credentials = cipa.value
  deviceStore.wifi = wifi.value

  router.push(`/device/${route.params.diviceType}/enable`)
}
</script>

<style scoped></style>
