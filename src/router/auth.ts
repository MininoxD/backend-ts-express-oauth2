import { Router, Express } from 'express'
import passport from 'passport'
import { Login } from '../Auth/controllers/login'
import { PhoneRegistration } from '../Auth/controllers/phoneRegistration'
import { Register } from '../Auth/controllers/register'
import { ResendCode } from '../Auth/controllers/resendCode'
import { VerifyCodePhone } from '../Auth/controllers/verifCodePhone'
import { VerifyEmail } from '../Auth/controllers/verifyEmail'
import { CheckParams } from '../Auth/middlewares/checkParams'
import { phoneVerify } from '../Auth/middlewares/phoneVerify'
import { UserVerify } from '../Auth/middlewares/verify'
import facebookRouter from '../strategys/facebook'
import routerGoogle from '../strategys/google'

const authRouter = Router()

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user)
})

authRouter.use('/google', routerGoogle)

authRouter.use('/facebook', facebookRouter)

authRouter.post('/email/register', CheckParams({ parameters: ['email', 'password'] }), UserVerify, Register)
authRouter.post('/email/login', CheckParams({ parameters: ['email', 'password'] }), Login)
authRouter.get('/email/verify', VerifyEmail)
authRouter.post('/email/resend-code', CheckParams({ parameters: ['email'] }), ResendCode)
authRouter.post('/phone/login', CheckParams({ parameters: ['phone'] }), phoneVerify, PhoneRegistration)
authRouter.post('/phone/confirm', CheckParams({ parameters: ['phone', 'code'] }), VerifyCodePhone)

export default authRouter
