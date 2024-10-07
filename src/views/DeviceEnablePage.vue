<template>
  <ion-nav ref="nav" :root="component" :rootParams="rootParams"></ion-nav>
</template>

<script lang="ts" setup>
import { markRaw, onMounted, ref } from 'vue'
import { IonNav } from '@ionic/vue'
import RegisterCIPAPage from './RegisterCIPAPage.vue'

const nav = ref<any>(null)

const rootParams = ref({
  navController: null,
})

const component = markRaw(RegisterCIPAPage)

onMounted(async () => {
  rootParams.value.navController = await nav.value?.$el
})
</script>
