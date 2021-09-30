import { ErrorDetail } from '../express/errors'

declare global {
  export interface Error {
    stack?: string
    errorStatus?: number
    errorDetails?: ErrorDetail[]
  }

  namespace Express {
    interface Response {
      error: (err: Error) => void
    }
  }
}
