import crypto, { createHmac } from 'crypto'
import { v4 } from 'uuid'
import { customAlphabet } from 'nanoid'

/* Use AEC Encrypton tool for long env variables:
https://www.devglan.com/online-tools/aes-encryption-decryption
Read more: https://leerob.io/blog/vercel-env-variables-size-limit */

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipheriv(
    'aes-128-cbc',
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  )
  let decrypted = decipher.update(hash, 'base64', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export const hashPasswordWithSalt = (password: string, salt: string): string => {
  return createHmac('sha512', salt).update(`${salt}#${password}#${salt}`).digest('base64')
}

export const generateUUID = (param?: 'v4' | number) => {
  if (param === 'v4') return v4()
  const length = typeof param === 'number' ? param : 11
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', length)
  return nanoid()
}
