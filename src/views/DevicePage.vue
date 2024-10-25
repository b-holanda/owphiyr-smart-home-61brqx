<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="ion-text-center">
          <ion-title>Meus Dispositivos</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-segment value="cipa" @ion-change="changeSegment()">
      <ion-segment-button value="cipa">
        <ion-label>CIPA</ion-label>
      </ion-segment-button>
      <ion-segment-button value="vigia">
        <ion-label>Vigia</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-content fixed-slot-placement="before">
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="setOpen(true)">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <div v-if="segment.cipa">
        <ion-label v-if="!hasCipa" class="ion-text-center">
          <p class="ion-padding-top">
            Você ainda não possui nenhuma CIPA cadastrada.
          </p>
        </ion-label>
        <ion-list>
          <ion-item
            v-for="cipa in cipas"
            :key="cipa.id"
            button
            class="cipa"
            @click="
              cipa.door_open && cipa.online
                ? closeDoor(cipa.id)
                : openDoor(cipa.id)
            "
          >
            <ion-icon
              :icon="cipa.online ? wifi : cloudOffline"
              :color="cipa.online ? 'success' : 'danger'"
              size="large"
            ></ion-icon>
            <ion-label>
              <h3>{{ cipa.name }}</h3>
              <p>
                <ion-icon
                  :icon="cipa.door_open ? lockOpen : lockClosed"
                  :color="cipa.door_open ? 'tertiary' : 'medium'"
                  slot="start"
                ></ion-icon>
                Porta: {{ cipa.door_open ? 'ABERTA' : 'FECHADA' }}
              </p>
              <p>
                Status:
                <span :class="{ online: cipa.online, offline: !cipa.online }">{{
                  cipa.online ? 'ONLINE' : 'OFFLINE'
                }}</span>
              </p>
            </ion-label>
            <ion-icon
              slot="end"
              :icon="arrowForwardCircle"
              color="primary"
            ></ion-icon>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="ionInfiniteCipa">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
      <div v-else>
        <ion-label v-if="!hasVigia" class="ion-text-center">
          <p class="ion-padding-top">
            Você ainda não possui nenhuma Vigia cadastrada.
          </p>
        </ion-label>
        <ion-infinite-scroll @ionInfinite="ionInfiniteVigia">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
      <ion-modal :is-open="isOpenModal">
        <ion-header>
          <ion-toolbar color="primary">
            <div class="ion-text-center">
              <ion-title>Adicionar Dispositio</ion-title>
            </div>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <ion-segment value="CIPA" @ion-change="changeAddSegment()">
                  <ion-segment-button value="CIPA">
                    <ion-label>Cipa</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="Vigia">
                    <ion-label>Vigia</ion-label>
                  </ion-segment-button>
                </ion-segment>
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col
                size="12"
                class="modal-control ion-justify-content-between"
              >
                <ion-button fill="solid" color="medium" @click="setOpen(false)"
                  >Cancelar</ion-button
                >
                <ion-button fill="solid" @click="addDevice()"
                  >Continuar</ion-button
                >
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonList,
  IonItem,
  IonHeader,
  toastController,
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
} from '@ionic/vue'
import {
  add,
  wifi,
  cloudOffline,
  lockOpen,
  lockClosed,
  arrowForwardCircle,
} from 'ionicons/icons'
import { useApi } from '@/api'
import { authStore } from '@/store/auth/auth.store'
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { CIPA, Vigia } from '@/models'

const router = useRouter()
const api = useApi()
const retriveCipasEndpoint = ref('/api/v1/cipas')
const retriveVigiasEndpoint = ref('/api/v1/vigias')
const isOpenModal = ref(false)
const cipas = ref<Array<CIPA>>([])
const vigias = ref<Array<Vigia>>([])
const segment = ref({ cipa: true, vigia: false })
const addSegment = ref({ cipa: true, vigia: false })
const hasCipa = computed(() => cipas.value.length > 0)
const hasVigia = computed(() => vigias.value.length > 0)

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

  loadCipas()
  loadVigias()
})

const loadCipas = async (endpoint?: string) => {
  await api.get('/sanctum/csrf-cookie')

  const response = await api.get(
    endpoint ? endpoint : retriveCipasEndpoint.value
  )

  if (response?.data) {
    cipas.value = response.data.data
    retriveCipasEndpoint.value = response.data.links.next
  }
}

const loadVigias = async () => {
  await api.get('/sanctum/csrf-cookie')

  const response = await api.get(retriveVigiasEndpoint.value)

  if (response?.data) {
    vigias.value = response.data.data
    retriveVigiasEndpoint.value = response.data.links.next
  }
}

const closeDoor = async (id: number) => {
  await api.get('/sanctum/csrf-cookie')

  await api.patch(`/api/v1/cipas/${id}/close-door`)

  loadCipas('/api/v1/cipas')
}

const openDoor = async (id: number) => {
  await api.get('/sanctum/csrf-cookie')

  await api.patch(`/api/v1/cipas/${id}/open-door`)

  loadCipas('/api/v1/cipas')
}

const changeSegment = () => {
  segment.value.cipa = !segment.value.cipa
  segment.value.vigia = !segment.value.vigia
}

const changeAddSegment = () => {
  addSegment.value.cipa = !addSegment.value.cipa
  addSegment.value.vigia = !addSegment.value.vigia
}

const ionInfiniteVigia = async (ev: InfiniteScrollCustomEvent) => {
  if (!retriveVigiasEndpoint.value) {
    ev.target.complete()
    return
  }

  await api.get('/sanctum/csrf-cookie')

  const response = await api.get(retriveVigiasEndpoint.value)

  if (response?.data) {
    vigias.value = [...vigias.value, ...response.data.data] as any

    retriveVigiasEndpoint.value = response.data.links.next
  }

  ev.target.complete()
}

const ionInfiniteCipa = async (ev: InfiniteScrollCustomEvent) => {
  if (!retriveCipasEndpoint.value) {
    ev.target.complete()
    return
  }

  await api.get('/sanctum/csrf-cookie')

  const response = await api.get(retriveCipasEndpoint.value)

  if (response?.data) {
    cipas.value = [...cipas.value, ...response.data.data] as any

    retriveCipasEndpoint.value = response.data.links.next
  }

  ev.target.complete()
}

const setOpen = (open: boolean) => (isOpenModal.value = open)

const addDevice = () => {
  if (addSegment.value.cipa) {
    router.push({ name: 'device-add', params: { deviceType: 'CIPA' } })
  } else {
    router.push({ name: 'device-add', params: { deviceType: 'Vigia' } })
  }

  setOpen(false)
}
</script>

<style scoped>
.title {
  font-size: 8rem;
  color: var(--ion-color-warning);
}

.modal-control {
  display: flex;
}

.cipa {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.cipa ion-label {
  width: fit-content;
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--ion-color-dark);
}

.online {
  color: var(--ion-color-success) !important;
}

.offline {
  color: var(--ion-color-danger) !important;
}

ion-icon {
  padding: 10px;
}

ion-icon[slot='start'] {
  padding: 0;
}

ion-icon[slot='end'] {
  font-size: 2rem;
  padding: 0;
}
</style>
