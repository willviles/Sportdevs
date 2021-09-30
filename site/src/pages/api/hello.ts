import { NextApiRequest, NextApiResponse } from 'next'

export default async function HelloRoute (req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200
  res.json({ message: 'Hi' })
}
