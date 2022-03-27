import { NextFunction, Request, Response } from 'express'
import clientDB from '../../services/database'
import clientTwilio from '../../services/sms'
import { getToken } from '../../utils/token'
interface Params {
    phone: string
}
export const phoneVerify = async (req: Request, res: Response, next: NextFunction) => {
  const { phone }: Params = req.body
  const user = await clientDB.user.findUnique({
    where: {
      phone
    }
  })
  if (!user) return next()
  const currentDate = new Date()
  const dateCreate = user?.createHash || new Date('2000-01-01')
  if (user?.hash && !(dateCreate.getTime() + 900000 < currentDate.getTime())) return res.status(400).json({ error: 'You have an active authentication code' })
  const hashToken = getToken()
  await clientDB.user.update({
    where: {
      id: user?.id
    },
    data: {
      hash: hashToken,
      createHash: currentDate
    }
  })
  clientTwilio.messages.create({
    from: '+12254016523',
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
