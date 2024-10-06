<template>
  <ion-page>
    <ion-tabs ref="tabs">
      <ion-tab tab="user"><ProfileAsync></ProfileAsync></ion-tab>
      <ion-tab tab="things"><DeviceAsync></DeviceAsync></ion-tab>
      <ion-tab tab="settings"><SettingsAsync></SettingsAsync></ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="user" id="tabBtnUser">
          <ion-icon :icon="personCircleOutline" />
          Perfil
        </ion-tab-button>
        <ion-tab-button tab="things" id="tabBtnThings">
          <ion-icon :icon="radio" />
          Dispositivos
        </ion-tab-button>
        <ion-tab-button tab="settings">
          <ion-icon :icon="settingsOutline" />
          Configurações
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  toastController,
  IonTabs,
  IonTab,
  IonIcon,
  IonTabBar,
  IonTabButton,
} from '@ionic/vue'
import { onMounted, defineAsyncComponent, ref } from 'vue'
import { authStore } from '@/store/auth/auth.store'
import { personCircleOutline, radio, settingsOutline } from 'ionicons/icons'

const ProfileAsync = defineAsyncComponent(() => import('./ProfilePage.vue'))
const DeviceAsync = defineAsyncComponent(() => import('./DevicePage.vue'))
const SettingsAsync = defineAsyncComponent(() => import('./SettingsPage.vue'))

const tabs = ref(null)

onMounted(async () => {
  if (authStore.emailVerificationMessage) {
    const toast = await toastController.create({
      message: authStore.emailVerificationMessage,
      duration: 5000,
      position: 'top',
    })

    toast.present()

    authStore.emailVerificationMessage = ''
  }
  const tab = await tabs.value.$el.getTab('things')

  await tab.setActive()

  setTimeout(() => {
    document.getElementById('tabBtnUser').classList.remove('tab-selected')
    document.getElementById('tabBtnThings').classList.add('tab-selected')
    document.getElementById('tabBtnThings').dispatchEvent(new Event('click'))
  }, 10)
})
</script>

<style scoped>
ion-thumbnail {
  --size: 140px;
  --border-radius: 14px;
}
</style>
