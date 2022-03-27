import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import clientDB from '../../services/database'

interface Params {
    phone: string
    code: string
}
export const VerifyCodePhone = async (req: Request, res: Response) => {
  const { phone, code }: Params = req.body
  const JWT_SECRET = process.env.JWT_SECRET || 'secret'
  const user = await clientDB.user.findUnique({
    where: {
      phone
    }
  })

  if (!user) return res.status(404).json({ message: 'User not found' })
  if (user.hash !== code) return res.status(401).json({ message: 'Code is not correct' })
  const currentDate = new Date()
  const dateCreate = user?.createHash || new Date('2000-01-01')
  if (dateCreate.getTime() + 900000 < currentDate.getTime()) return res.status(400).json({ message: 'Code expired' })
  const token = sign({ id: user?.id }, JWT_SECRET, {
    expiresIn: 36000
  })
  const { password, createHash, hash, ...restUser } = user
  return res.status(200).json({ user: restUser, token })
}
