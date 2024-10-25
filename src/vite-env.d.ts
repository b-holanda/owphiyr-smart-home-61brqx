/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_SECRET: string
  readonly VITE_BLE_DEVICE_SERVICE_UUID: string
  readonly VITE_BLE_DEVICE_CHARACTERISTIC_UUID_SSID: string
  readonly VITE_BLE_DEVICE_CHARACTERISTIC_UUID_PASSWORD: string
  readonly VITE_BLE_DEVICE_CHARACTERISTIC_UUID_RESET: string
  readonly VITE_BLE_DEVICE_CHARACTERISTIC_UUID_CHANGE_APP_STATE: string
  readonly VITE_BLE_DEVICE_CHARACTERISTIC_UUID_REBOOT: string
  readonly VITE_BLE_DEVICE_CHARACTERISTIC_UUID_API_SECRET: string
  readonly VITE_API_CLIENT_ID: string
  readonly VITE_API_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
