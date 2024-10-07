export interface Token {
  payload: string
}
export interface User {
  id?: number
  name: string
  email: string
  password?: string
}

export interface CIPA {
  id: number
  name?: string
  door_open: boolean
  last_healtcheck: Date
  online: boolean
  token?: string
}

export interface Vigia {
  id: number
  name?: string
  last_healtcheck: Date
  online: boolean
  token?: string
}

export interface DeviceCredentials {
  code: string
  secret: string
}

export interface Wifi {
  ssid: string
  password: string
}
