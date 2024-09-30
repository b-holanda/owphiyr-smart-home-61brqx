<template>
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
          <ion-input
            label="Digite seu email"
            label-placement="floating"
            placeholder="Email"
            fill="outline"
            type="email"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-input
            label="Digite sua senha"
            label-placement="floating"
            placeholder="Senha"
            type="password"
            fill="outline"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-button expand="block">Entrar</ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-nav-link router-direction="forward" :component="registerView">
            <ion-button expand="block" color="secondary"
              >Cadastre-se</ion-button
            >
          </ion-nav-link>
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
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import {
  IonContent,
  IonImg,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonButton,
  IonNavLink,
  IonGrid,
} from '@ionic/vue';
import RegisterPage from './RegisterPage.vue';

const registerView = markRaw(RegisterPage);
</script>

<style scoped></style>
