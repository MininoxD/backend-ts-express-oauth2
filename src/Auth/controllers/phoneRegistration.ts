import { Request, Response } from 'express'
import clientTwilio from '../../services/sms'
import { UserCreate } from '../../User/create'
import { getToken } from '../../utils/token'

interface Param {
    phone: string
}
export const PhoneRegistration = async (req: Request, res: Response) => {
  const TWILIO_NUMBER = process.env.TWILIO_NUMBER || ''
  const { phone }: Param = req.body
  const hashToken = getToken()
  const currentDate = new Date()
  await UserCreate({
    phone,
    hash: hashToken,
    createHash: currentDate
  })

  clientTwilio.messages.create({
    from: TWILIO_NUMBER,
    body: `GezAuth Your Code is: ${hashToken}`,
    to: phone
  })
    .then(message => {
      console.log(message)
      return res.status(200).json({ message: `Cofirmmation code send your phone number ${phone}` })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ message: 'Something went wrong while sending the message' })
    })
}
