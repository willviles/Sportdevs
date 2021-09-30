import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { NextApiRequest } from 'next'

export class HTTPError extends Error {
  constructor (public req: AxiosRequestConfig, public res: AxiosResponse) {
    super()
    this.message = `${res.statusText} (${res.status}) error on ${req.method} request to ${req.url}`
  }
}

export const HTTPDefaultHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache'
}

export class HTTP {
  static getHeaders (ctx?: { req: NextApiRequest }) {
    return { ...HTTPDefaultHeaders }
  }

  static async request <T extends object> (config: AxiosRequestConfig, ctx?: { req: NextApiRequest }): Promise<T> {
    config.headers = {
      ...HTTP.getHeaders(),
      ...config.headers
    }

    try {
      const res = await Axios({ ...config })
      return res.data
    } catch (err) {
      if (err.isAxiosError) {
        throw new HTTPError(config, err.response)
      } else {
        throw err
      }
    }
  }
}
