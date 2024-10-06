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
            <ion-text>Informe seus dados de cadastro</ion-text>
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
        <ion-row>
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
        <ion-row>
          <ion-col size="12">
            <ion-input
              ref="wifiSSID"
              label="Nome Wi-Fi"
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
              label="Senha Wi-Fi"
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
            <ion-button expand="block">Continuar</ion-button>
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
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cipa = ref({
  code: '',
  secret: '',
})

const wifi = ref({
  ssid: '',
  password: '',
})
</script>

<style scoped></style>
