import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import sgMail from '../../services/mail'
import { TemplateEmail } from '../../utils/templeateEmail'
import { getMessage, getToken } from '../../utils/token'
const prisma = new PrismaClient()
interface Params{
    email: string
}
export const ResendCode = async (req: Request, res: Response) => {
  const URL_MAIL = process.env.URL_MAIL || 'http://localhost:5000'
  const { email }:Params = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) return res.status(400).json({ error: 'User not found' })
  if (user?.emailVerify) return res.status(200).json({ message: 'Email already verified' })
  const hashToken = getToken()
  const currentDate = new Date()
  await prisma.user.update({
    where: {
      email
    },
    data: {
      hash: hashToken,
      createHash: currentDate
    }
  })
  const html = TemplateEmail(`${URL_MAIL}/auth/email/verify?token=${hashToken}&id=${user?.id}`)
  const message = getMessage({
    to: email,
    subject: 'Email verification Gez',
    html
  })

  sgMail.send(message)
    .then(() => {
      return res.status(200).json({ message: 'Email sent' })
    })
    .catch(error => {
      res.status(400).json({ error: error.message })
    })
}
