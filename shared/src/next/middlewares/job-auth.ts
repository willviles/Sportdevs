import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import type { NextMiddleware } from 'next-api-middleware'

export const jobAuthMiddleware/*: NextMiddleware */ = async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
  try {
    if (!req.headers.authorization) throw new Error('Authorization header not present')
    const token = req.headers.authorization.split(' ')[1]
    if (token !== process.env.JOB_API_ACCESS_TOKEN) throw new Error('Bearer token is invalid')
    await next(req, res)
  } catch (err) {
    res.status(401).json({
      message: err.toString()
    })
  }
}
