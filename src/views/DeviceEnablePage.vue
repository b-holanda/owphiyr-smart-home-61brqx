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
            <ion-spinner v-if="showSpinner" color="primary"></ion-spinner>
            <ion-progress-bar
              :value="progress"
              v-if="showProgressBar"
            ></ion-progress-bar>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12 ion-text-center">
            <ion-text color="secondary">
              <h2>{{ feedback }}</h2>
            </ion-text>
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
  IonSpinner,
  IonProgressBar,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import {
  BleClient,
  BleDevice,
  BleService,
  numbersToDataView,
  textToDataView,
} from '@capacitor-community/bluetooth-le'
import { deviceStore } from '@/store/device/device.store'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/api'

const showSpinner = ref(true)
const showProgressBar = ref(false)
const progress = ref(0)
const feedback = ref('')
const router = useRouter()
const route = useRoute()
const api = useApi()

const deviceType = route.params.deviceType
const enableEndpoint =
  deviceType === 'CIPA' ? '/api/v1/cipas/enable' : '/api/v1/vigias/enable'

const showDeviceEndpoint =
  deviceType === 'CIPA' ? '/api/v1/cipas/' : '/api/v1/vigias/'

const findDevice = (): Promise<BleDevice> => {
  return new Promise((resolve, reject) => {
    BleClient.requestLEScan(
      {
        name: deviceStore.credentials.code,
      },
      (results) => {
        console.log('found device', results)
        resolve(results.device)
      }
    )

    setTimeout(() => {
      BleClient.stopLEScan()
      reject()
    }, 3000)
  })
}

const findService = async (
  device: BleDevice
): Promise<BleService | undefined> => {
  const services = await BleClient.getServices(device.deviceId)

  return services.find(
    (s) => s.uuid === import.meta.env.VITE_BLE_DEVICE_SERVICE_UUID
  )
}

onMounted(async () => {
  let device: BleDevice | undefined = undefined

  try {
    feedback.value = 'Iniciando serviço de Bluetooth...'

    await BleClient.initialize()

    feedback.value = 'Habilitando Bluetooth...'

    if (!(await BleClient.isEnabled())) {
      deviceStore.enableMessage = 'Bluetooth desabilitado'
      await BleClient.requestEnable()
    }

    feedback.value = `Conectando com a ${deviceType}...`

    device = await findDevice()

    BleClient.connect(device.deviceId)

    feedback.value = `Conectado com a ${deviceType}`

    const service = await findService(device)

    showSpinner.value = false
    showProgressBar.value = true

    if (!service) {
      throw new Error('Service not found')
    }

    feedback.value = 'Configurando Conexão Wi-Fi'

    await BleClient.write(
      device.deviceId,
      service.uuid,
      import.meta.env.VITE_BLE_DEVICE_CHARACTERISTIC_UUID_SSID,
      textToDataView(deviceStore.wifi.ssid)
    )

    progress.value = 0.1

    await BleClient.write(
      device.deviceId,
      service.uuid,
      import.meta.env.VITE_BLE_DEVICE_CHARACTERISTIC_UUID_PASSWORD,
      textToDataView(deviceStore.wifi.password)
    )

    progress.value = 0.2

    feedback.value = `Habilitando ${deviceType}`

    await api.get('/sanctum/csrf-cookie')
    const response = await api.patch(enableEndpoint, {
      code: deviceStore.credentials.code,
      secret: deviceStore.credentials.secret,
    })

    progress.value = 0.3

    await BleClient.write(
      device.deviceId,
      service.uuid,
      import.meta.env.VITE_BLE_DEVICE_CHARACTERISTIC_UUID_API_SECRET,
      textToDataView(response.data.token)
    )

    progress.value = 0.5

    await BleClient.write(
      device.deviceId,
      service.uuid,
      import.meta.env.VITE_BLE_DEVICE_CHARACTERISTIC_UUID_CHANGE_APP_STATE,
      numbersToDataView([1])
    )

    progress.value = 0.75

    await BleClient.write(
      device.deviceId,
      service.uuid,
      import.meta.env.VITE_BLE_DEVICE_CHARACTERISTIC_UUID_REBOOT,
      numbersToDataView([1])
    )

    progress.value = 1

    feedback.value = `${deviceType} habilitada com sucesso`

    feedback.value = `Reiniciando ${deviceType} aguarde 20 segundos...`

    let counter = 20

    showProgressBar.value = false
    showSpinner.value = true

    const timer = setInterval(() => {
      counter--

      feedback.value = `Reiniciando ${deviceType} aguarde ${counter} segundos...`

      if (counter === 0) {
        clearInterval(timer)

        showSpinner.value = false

        api
          .get(showDeviceEndpoint + response.data.id)
          .then((response) => {
            if (response.data.online) {
              feedback.value = `${deviceType} reiniciada com sucesso!`

              setTimeout(() => {
                router.replace('/home')
              }, 5000)
            }
          })
          .catch(() => {
            feedback.value = `Erro ao conectar com a ${deviceType}`
            deviceStore.enableMessage = `Erro ao conectar com a ${deviceType}`

            setTimeout(() => {
              router.back()
            }, 5000)
          })
      }
    }, 1000)
  } catch (error) {
    console.error(error)
    feedback.value = `Erro ao conectar com a ${deviceType}`
    deviceStore.enableMessage = `Erro ao conectar com a ${deviceType}`

    setTimeout(() => {
      router.back()
    }, 5000)
  } finally {
    BleClient.disconnect(device?.deviceId || '')
  }
})
</script>
<style scoped>
ion-spinner {
  width: 100px;
  height: 100px;
}
</style>
