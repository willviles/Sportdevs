import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import type { NextMiddleware } from 'next-api-middleware'

export const httpMethodMiddleware = (
  method: 'GET' | 'POST' | 'PATCH'
) => {
  const middleware/*: NextMiddleware */ = async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    if (req.method === method || req.method == 'OPTIONS') {
      await next(req, res)
    } else {
      res.status(404).end()
    }
  }
  return middleware
}
