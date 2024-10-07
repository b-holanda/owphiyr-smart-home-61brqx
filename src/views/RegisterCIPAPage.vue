<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="ion-text-center">
          <ion-title>Adicionar CIPA</ion-title>
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
              ref="cipaCode"
              label="Código"
              label-placement="floating"
              placeholder="Código da CIPA"
              fill="outline"
              v-model="cipa.code"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-botton">
          <ion-col size="12">
            <ion-input
              ref="cipaSecret"
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
              ref="wifiSSID"
              label="SSID (Nome da rede Wi-Fi)"
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
              ref="WifiPassword"
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
            <ion-nav-link
              router-direction="forward"
              :component="component"
              :component-props="{ navController }"
            >
              <ion-button expand="block" @click="saveDevice()"
                >Continuar</ion-button
              >
            </ion-nav-link>
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
  IonNavLink,
} from '@ionic/vue'
import { ref, onMounted, markRaw, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import PerformEnablePage from './PerformEnablePage.vue'

const { navController } = defineProps<{
  navController: any
}>()

const router = useRouter()

const cipa = ref<DeviceCredentials>({
  code: '',
  secret: '',
})

const wifi = ref<Wifi>({
  ssid: '',
  password: '',
})

const component = markRaw(PerformEnablePage)

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
}
</script>

<style scoped></style>
