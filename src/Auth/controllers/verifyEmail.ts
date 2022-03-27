import { PrismaClient } from '@prisma/client'

import { Request, Response } from 'express'
const prisma = new PrismaClient()
export const VerifyEmail = async (req: Request, res: Response) => {
  const id = req.query.id?.toString() || ''
  const token = req.query.token?.toString() || ''
  const currentDate = new Date()
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  const dateCreate = user?.createHash || new Date('2000-01-01')

  if (!user) return res.status(400).json({ error: 'User not found' })
  if (dateCreate.getTime() + /* 7.2e+6 */ 300000 < currentDate.getTime()) return res.status(400).json({ error: 'Code expired' })
  if (!(user?.hash === token)) return res.status(400).json({ error: 'Code not found' })

  await prisma.user.update({
    where: {
      id
    },
    data: {
      emailVerify: true
    }
  })

  return res.status(200).json({ message: 'Email verified' })
}
