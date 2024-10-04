import { Drivers, Storage } from '@ionic/storage'

class StorageService {
  private static _instance: StorageService

  private readonly storage: Storage

  private constructor() {
    this.storage = new Storage({
      name: '__owphiyr_db',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    })
  }

  public static getInstance(): StorageService {
    if (!StorageService._instance) {
      StorageService._instance = new StorageService()
    }
    return StorageService._instance
  }

  public async init(): Promise<void> {
    await this.storage.create()
  }

  public async set<T>(key: string, value: T): Promise<void> {
    await this.storage.set(key, JSON.stringify(value))
  }

  public async get<T>(key: string): Promise<T> {
    return JSON.parse(await this.storage.get(key))
  }

  public async remove(key: string): Promise<void> {
    await this.storage.remove(key)
  }

  public async clear(): Promise<void> {
    await this.storage.clear()
  }

  public async keys(): Promise<string[]> {
    return this.storage.keys()
  }

  public async length(): Promise<number> {
    return this.storage.length()
  }

  public async has(key: string): Promise<boolean> {
    return this.storage.keys().then((keys) => keys.includes(key))
  }
}

const storageService = StorageService.getInstance()

export { storageService }
