import { ValidationError } from 'class-validator'

export interface ErrorDetail {
  title: string
  status: number
  detail?: string
}

export abstract class CustomError extends Error {
  constructor (public raw?: string | string[] | ValidationError | ValidationError[]) {
    super(...arguments)
  }
  abstract readonly errorMsg: string
  abstract readonly errorStatus: number
  get defaultError () {
    return {
      title: this.errorMsg,
      status: this.errorStatus
    }
  }
  get errorDetails () {
    return !this.raw
      ? [{ ...this.defaultError }]
      : (Array.isArray(this.raw) ? this.raw : [this.raw]).reduce((errors, rawError) => (
        [ ...errors, { ...this.defaultError, detail: rawError }]
      ), [])
  }
}

export class InvalidError extends CustomError {
  readonly errorMsg = 'Invalid request'
  readonly errorStatus = 400
}

export class UnauthorizedError extends CustomError {
  readonly errorMsg = 'Unauthorized'
  readonly errorStatus = 401
}

export class NotFoundError extends CustomError {
  readonly errorMsg = 'Not found'
  readonly errorStatus = 404
}

export const DEFAULT_SERVER_ERROR_MSG = 'An error occured. Please try again later.'

export class InternalServerError extends CustomError {
  readonly errorMsg = DEFAULT_SERVER_ERROR_MSG
  readonly errorStatus = 500
}
