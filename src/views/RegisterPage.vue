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
            <ion-text>Informe seus dados de cadastro</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ul v-if="validation.name.errors.length > 0" class="validation">
              <li v-for="error in validation.name.errors" :key="error">
                <ion-text color="danger">{{ error }}</ion-text>
              </li>
            </ul>
            <ion-input
              ref="name"
              label="Digite seu nome"
              label-placement="floating"
              placeholder="Nome"
              fill="outline"
              v-model="user.name"
            ></ion-input>
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
              ref="email"
              label="Digite seu email"
              label-placement="floating"
              placeholder="Email"
              fill="outline"
              type="email"
              v-model="user.email"
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
              ref="password"
              label="Digite sua senha"
              label-placement="floating"
              placeholder="Senha"
              type="password"
              fill="outline"
              v-model="user.password"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="register">Cadastrar</ion-button>
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
import {
  IonContent,
  IonImg,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonButton,
  IonGrid,
  loadingController,
  IonPage,
  toastController,
} from '@ionic/vue'
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { authStore } from '@/store/auth/auth.store'
import { useApi } from '@/api'
import { useRouter } from 'vue-router'
import { User } from '@/models'

const router = useRouter()

const user = ref<User>({
  name: '',
  email: '',
  password: '',
})

const validation = ref({
  name: {
    errors: [],
    isInvalid: false,
  },
  email: {
    errors: [],
    isInvalid: false,
  },
  password: {
    errors: [],
    isInvalid: false,
  },
})

const register = async () => {
  const loading = await loadingController.create({
    message: 'Estamos cadastrando seu usuário...',
  })

  const api = useApi()

  try {
    loading.present()
    await api.get('/sanctum/csrf-cookie')

    await api.post<User>('/api/v1/users', user.value)

    router.replace('/login')

    authStore.loginPageMessage = 'Usuário cadastrado com sucesso!'
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        const { errors, message } = error.response.data

        if (errors?.name) {
          validation.value.name.errors = errors.name
          validation.value.name.isInvalid = true
        } else {
          validation.value.name.errors = []
          validation.value.name.isInvalid = false
        }

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
  } finally {
    loading.dismiss()
  }
}
</script>

<style scoped>
.validation {
  list-style-type: none;
  padding: 0;
}
</style>
