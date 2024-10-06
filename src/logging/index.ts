import { App } from 'vue'
import winston from 'winston'

const papertrail = new winston.transports.Http({
  host: 'logs.collector.solarwinds.com',
  path: '/v1/log',
  auth: { username: '', password: 'F3JANpD_avTln07yIKljD8DuZpJR' },
  ssl: true,
})

export const logger = winston.createLogger({
  transports: [papertrail],
})

export const winstonLogger = {
  install(app: App) {
    app.config.globalProperties.console = logger
  },
}
