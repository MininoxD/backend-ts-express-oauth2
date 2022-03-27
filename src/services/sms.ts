import { Twilio } from 'twilio'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || ''

const clientTwilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export default clientTwilio
