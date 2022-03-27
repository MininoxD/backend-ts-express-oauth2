import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
const prisma = new PrismaClient()
interface Params {
    email: string
    password: string
}
export const UserVerify = async (req: Request, res: Response, next: NextFunction) => {
  const { email }:Params = req.body
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (!user) return next()
  if (user?.idGoogle || user?.idFacebook) return res.status(400).json({ error: 'Your account is registered with a social network' })
  if (!user?.emailVerify) return res.status(400).json({ message: 'Email not verified' })
  return res.status(400).json({ error: 'User already exists' })
}
