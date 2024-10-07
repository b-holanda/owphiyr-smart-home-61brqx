import { reactive } from 'vue'

export const deviceStore = reactive({
  credentials: {
    code: '',
    secret: '',
  },
  wifi: {
    ssid: '',
    password: '',
  },
  device: '',
  cipa: {
    id: 0,
    name: '',
    door_open: false,
    last_healtcheck: new Date(),
    online: false,
    token: '',
  },
  vigia: {
    id: 0,
    name: '',
    last_healtcheck: new Date(),
    online: false,
    token: '',
  },
  enableMessage: '',
})
