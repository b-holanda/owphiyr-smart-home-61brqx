<template>
  <ion-nav :root="component"></ion-nav>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import { IonNav } from '@ionic/vue';
import LoginPage from './pages/LoginPage.vue';

const component = markRaw(LoginPage);
</script>

<style scoped></style>
