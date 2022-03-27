import { User } from '@prisma/client'
import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import clientDB from '../services/database'
import { UserCreate } from '../User/create'

/* router */
const routerGoogle = Router()

const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE || ''
const CLIENT_SECRET_GOOGLE = process.env.CLIENT_SECRET_GOOGLE || ''

passport.use(new GoogleStrategy.Strategy({
  clientID: CLIENT_ID_GOOGLE,
  clientSecret: CLIENT_SECRET_GOOGLE,
  callbackURL: '/auth/google/callback',
  scope: [
    'profile',
    'email'
    /*  'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/analytics' */
  ]
},
async (accessToken, refreshToken, profile, cb) => {
  const email = profile.emails ? profile.emails[0].value : ''
  const queryUser = await clientDB.user.findFirst({
    where: {
      OR: [
        {
          email
        },
        {
          idGoogle: profile.id
        }
      ]
    }
  })
  if (!queryUser) {
    const photo = profile.photos ? profile.photos[0].value : ''
    const user = await UserCreate({
      idGoogle: profile.id,
      email,
      name: profile.displayName,
      photo
    })
    return cb(null, user)
  }

  const { password, hash, createHash, ...restUser } = queryUser
  return cb(null, restUser)
}
))

routerGoogle.get('/', passport.authenticate('google', { accessType: 'offline', prompt: 'consent' }))

routerGoogle.get('/callback', passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }), (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'secret'
  const user = req.user as User
  const token = sign({ id: user?.id }, JWT_SECRET, {
    expiresIn: 36000
  })
  res.redirect(`/dashboard?token=${token}`)
})

export default routerGoogle
