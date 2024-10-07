import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'br.com.owphiyr.smart',
  appName: 'Owphiyr Smart Home',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorCookies: {
      enabled: true,
    },
    BluetoothLe: {
      displayStrings: {
        scanning: 'Encontrando dispositivos...',
        cancel: 'Cancelar',
        availableDevices: 'Não há dispositivos disponíveis',
        noDeviceFound: 'Nenhum dispositivo encontrado',
      },
    },
  },
}

export default config
