import { Connection } from 'typeorm'

declare global {
  namespace NodeJS {
    interface Global {
      typeORMConnections: {
        [url: string]: Promise<Connection>
      }
    }
  }
}
