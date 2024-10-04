<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="7">
            <ion-img
              src="https://cdn.owphiyr.com.br/assets/462x540.png"
              alt="Owphiyr Logo"
            ></ion-img>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-text>Para iniciar informe seus dados de cadastro</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ul v-if="validation.email.errors.length > 0" class="validation">
              <li v-for="error in validation.email.errors" :key="error">
                <ion-text color="danger">{{ error }}</ion-text>
              </li>
            </ul>
            <ion-input
              label="Digite seu email"
              label-placement="floating"
              placeholder="Email"
              fill="outline"
              type="email"
              v-model="credentials.email"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ul v-if="validation.password.errors.length > 0" class="validation">
              <li v-for="error in validation.password.errors" :key="error">
                <ion-text color="danger">{{ error }}</ion-text>
              </li>
            </ul>
            <ion-input
              label="Digite sua senha"
              label-placement="floating"
              placeholder="Senha"
              type="password"
              fill="outline"
              v-model="credentials.password"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="login">Entrar</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" color="secondary" router-link="/register"
              >Cadastre-se</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" color="tertiary" fill="clear"
              >Esqueci minha senha</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { authStore } from '@/store/auth/auth.store'
import {
  IonContent,
  IonImg,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonButton,
  IonGrid,
  IonPage,
  onIonViewDidEnter,
  toastController,
  useIonRouter,
  loadingController,
} from '@ionic/vue'
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { storageService } from '@/storage'
import { Device, DeviceInfo } from '@capacitor/device'
import { Token } from '@/models'
import { useApi } from '@/api'

const ionRouter = useIonRouter()
const getInfo = async (): Promise<DeviceInfo> => {
  const info = await Device.getInfo()
  return info
}

const credentials = ref({
  email: '',
  password: '',
  device_name: '',
})

const validation = ref({
  email: {
    errors: [],
    isInvalid: false,
  },
  password: {
    errors: [],
    isInvalid: false,
  },
})

const api = useApi(ionRouter)

const login = async () => {
  const loading = await loadingController.create({
    message: 'Efetuando Login...',
  })

  try {
    loading.present()
    await api.get('/sanctum/csrf-cookie')

    credentials.value.device_name =
      (await getInfo()).name || (await getInfo()).model

    const response = await api.post('/api/v1/users/token', credentials.value)

    storageService.set<Token>('token', { payload: response.data.token })

    ionRouter.replace('/home')

    authStore.loginPageMessage = 'Login efetuado com sucesso!'
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        const { errors, message } = error.response.data

        if (errors?.email) {
          validation.value.email.errors = errors.email
          validation.value.email.isInvalid = true
        } else {
          validation.value.email.errors = []
          validation.value.email.isInvalid = false
        }

        if (errors?.password) {
          validation.value.password.errors = errors.password
          validation.value.password.isInvalid = true
        } else {
          validation.value.password.errors = []
          validation.value.password.isInvalid = false
        }

        const toast = await toastController.create({
          message,
          duration: 3000,
          position: 'top',
        })

        await toast.present()
      }
    }
    console.error(error)
  } finally {
    loading.dismiss()
  }
}

onIonViewDidEnter(async () => {
  if (authStore.loginPageMessage) {
    const toast = await toastController.create({
      message: authStore.loginPageMessage,
      duration: 5000,
      position: 'top',
    })

    toast.present()

    authStore.loginPageMessage = ''
  }
})
</script>

<style scoped>
.validation {
  list-style-type: none;
  padding: 0;
}
</style>
