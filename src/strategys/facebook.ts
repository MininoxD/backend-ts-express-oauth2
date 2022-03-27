import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import { Router } from 'express'

const facebookRouter = Router()
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || ''
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || ''

passport.use(new FacebookStrategy.Strategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
},
(accessToken, refreshToken, profile, cb) => {
  console.log('is login successfull')
  console.log(accessToken)
  console.log(refreshToken)
  console.log(profile)
  const user = {
    accessToken,
    refreshToken,
    profile
  }
  return cb(null, user)
}
))

facebookRouter.get('/', passport.authenticate('facebook', { scope: ['user_friends'] }))

facebookRouter.get('/callback', passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/dashboard' }))

export default facebookRouter
