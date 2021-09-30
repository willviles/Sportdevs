import { Request, Response, NextFunction } from 'express'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import type { NextMiddleware } from 'next-api-middleware'
import { instanceToPlain } from 'class-transformer-global-storage'
import { transformAndValidate, TransformValidationOptions } from 'class-transformer-validator'
import { InvalidError } from '../../express/errors'

export function nextValidationMiddleware <T> (
  object: 'query' | 'body',
  validationClass: T,
  options?: TransformValidationOptions
) {
  const middleware = async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    try {
      const obj = await transformAndValidate(validationClass as any, req[object], options)
      req[object] = instanceToPlain(obj)
      await next(req, res)
    } catch (errors) {
      console.error(errors)
      res.status(400).json({ errors })
    }
  }
  return middleware
}

export function expressValidationMiddleware <T> (
  object: 'query' | 'body',
  validationClass: T,
  options?: TransformValidationOptions
) {
  const middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const obj = await transformAndValidate(validationClass as any, req[object], options)
      req[object] = instanceToPlain(obj)
      next()
    } catch (errors) {
      console.error(errors)
      res.error(new InvalidError(errors))
    }
  }
  return middleware
}
