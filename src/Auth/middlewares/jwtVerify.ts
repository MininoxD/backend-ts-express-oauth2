import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
const prisma = new PrismaClient()
interface BodyToken {
    id: string
    iat: number,
    exp: number
}
export const JwtVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ error: 'No token provided' })
    const { id } = verify(token, process.env.JWT_SECRET || 'secret') as BodyToken
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!user) return res.status(401).json({ error: 'No user Found' })
    res.locals.idUser = id
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
