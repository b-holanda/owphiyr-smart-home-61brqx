<template>
  <ion-nav :root="component"></ion-nav>
</template>

<script lang="ts" setup>
import { markRaw, onBeforeMount } from 'vue'
import { IonNav } from '@ionic/vue'
import RegisterCIPAPage from './RegisterCIPAPage.vue'
import RegisterVigia from './RegisterVigia.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
let component = markRaw(RegisterCIPAPage)

onBeforeMount(() => {
  if (route.params.deviceType === 'vigia') {
    component = markRaw(RegisterVigia)
  }
})
</script>
