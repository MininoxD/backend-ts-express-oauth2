import { genSalt, hash } from 'bcryptjs'
import { Request, Response } from 'express'
import sgMail from '../../services/mail'
import { UserCreate } from '../../User/create'
import { TemplateEmail } from '../../utils/templeateEmail'
import { getMessage, getToken } from '../../utils/token'
interface Params {
    email: string
    password: string
}
export const Register = async (req: Request, res: Response) => {
  const { email, password }:Params = req.body
  const URL_MAIL = process.env.URL_MAIL || 'http://localhost:5000'
  const salt = await genSalt(10)
  const passwordEncrypted = await hash(password, salt)
  const hashToken = getToken()
  const currentDate = new Date()

  const user = await UserCreate({
    email,
    password: passwordEncrypted,
    hash: hashToken,
    createHash: currentDate
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
      res.status(400).json({ error })
    })
}
