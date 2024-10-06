<template>
  <ion-nav :root="component"></ion-nav>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { IonNav } from '@ionic/vue'

const component = markRaw()
</script>

<style scoped></style>
