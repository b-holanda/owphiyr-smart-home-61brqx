<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="#"></ion-back-button>
      </ion-buttons>
      <ion-title>Cadastro</ion-title>
    </ion-toolbar>
  </ion-header>
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
          <ion-input
            label="Digite seu nome"
            label-placement="floating"
            placeholder="Nome"
            fill="outline"
          ></ion-input>
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
          <ion-button expand="block">Cadastrar</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonImg,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonButton,
  IonGrid,
} from '@ionic/vue';
</script>

<style scoped></style>
