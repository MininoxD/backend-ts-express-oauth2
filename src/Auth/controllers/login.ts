import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
const prisma = new PrismaClient()
interface Params {
    email: string
    password: string
}
export const Login = async (req: Request, res: Response) => {
  const { email, password }:Params = req.body
  const JWT_SECRET = process.env.JWT_SECRET || 'secret'
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    const isValid = await compare(password, user.password || '')
    if (isValid) {
      if (user?.emailVerify) {
        const token = sign({ id: user?.id }, JWT_SECRET, {
          expiresIn: 36000
        })
        const { password, createHash, hash, ...restUser } = user
        return res.status(200).json({ user: restUser, token })
      }
      return res.status(400).json({ message: 'Email not verified' })
    }
    return res.status(400).json({
      error: 'Invalid credentials'
    })
  }
  return res.status(400).json({
    error: 'User not found'
  })
}
