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

/**
 * @swagger
 * components:
 *    schemas:
 *      message:
 *        type: object
 *        properties:
 *           message:
 *             type: string
 *      error:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *      userlogin:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            required: true
 *          password:
 *            type: string
 *            required: true
 *      user:
 *        type: object
 *        properties:
 *          user:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              email:
 *                type: string
 *              emailVerify:
 *                type: boolean
 *              name:
 *                type: string
 *              phone:
 *                type: string
 *              photo:
 *                type: string
 *              idFacebook:
 *                type: string
 *              idGoogle:
 *                type: strin
 *          token:
 *            type: string
 * */

/**
 * @swagger
 * /auth/google:
 *  get:
 *    summary: Google authentication
 *    tags:
 *      - Auth
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *
 * /auth/email/register:
 *  post:
 *   summary: Register user
 *   tags:
 *    - Auth
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/userlogin'
 *   responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/message'
 *      400:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/error'
 * /auth/email/login:
 *  post:
 *   summary: Login user
 *   tags:
 *    - Auth
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/userlogin'
 *   responses:
 *    200:
 *     description: Successful operation
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user'
 *    400:
 *     description: Fail operation
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 * /auth/email/verify:
 *  get:
 *   summary: Verify account by email
 *   tags:
 *      - Auth
 *   parameters:
 *      - in: query
 *        name: token
 *        schema:
 *          type: string
 *        required: true
 *        description: Code Verification
 *   responses:
 *      200:
 *        description: Successful verification
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/message'
 *      400:
 *        description: Fail verification
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/error'
 * /auth/email/resend-code:
 *  post:
 *    summary: Resend code by email for verification
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful verification
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/message'
 *      400:
 *        description: Fail verification
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/error'
 * /auth/phone/login:
 *  post:
 *    summary: Login user by phone
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              phone:
 *                type: string
 *                description: Phone number including code contry
 *    responses:
 *      200:
 *        description: Successful login for phone
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/message'
 *      400:
 *        description: Fail verification
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/error'
 * /auth/phone/confirm:
 *   post:
 *    summary: Confirm code phone for login
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              phone:
 *                type: string
 *              code:
 *                type: string
 *                description: Code verification
 *    responses:
 *      200:
 *        description: Successful login for phone
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      400:
 *        description: Fail verification
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/error'
 * */
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
