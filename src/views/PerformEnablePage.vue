<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="ion-text-center">
          <ion-title>Abilitando CIPA</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-img
              src="https://cdn.owphiyr.com.br/assets/462x540.png"
              alt="Owphiyr Logo"
            ></ion-img>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-text>{{ feedback }}</ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
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
  IonImg,
} from '@ionic/vue'
import { ref, onMounted, defineProps } from 'vue'
import { BleClient } from '@capacitor-community/bluetooth-le'
import { deviceStore } from '@/store/device/device.store'

const { navController } = defineProps<{
  navController: any
}>()

const feedback = ref('')

onMounted(async () => {
  try {
    feedback.value = 'Iniciando serviço de Bluetooth...'

    await BleClient.initialize()

    feedback.value = 'Habilitando Bluetooth...'

    if (!(await BleClient.isEnabled())) {
      deviceStore.enableMessage = 'Bluetooth desabilitado'
      await BleClient.requestEnable()
      // eslint-disable-next-line vue/no-mutating-props
      navController.pop()
      return
    }

    feedback.value = 'Conectando com a CIPA...'

    const device = await BleClient.requestDevice({
      name: deviceStore.credentials.code,
      services: [import.meta.env.VITE_BLE_DEVICE_SERVICE_UUID],
    })

    feedback.value = 'Conectado com a CIPA'

    setTimeout(() => {
      BleClient.disconnect(device.deviceId)
      // eslint-disable-next-line vue/no-mutating-props
      navController.pop()
    }, 10000)
  } catch (error) {
    console.error(error)
    feedback.value = 'Erro ao conectar com a CIPA'
    deviceStore.enableMessage = 'Erro ao conectar com a CIPA'

    setTimeout(() => {
      // eslint-disable-next-line vue/no-mutating-props
      navController.pop()
    }, 3000)
  }
})
</script>
