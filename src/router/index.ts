import { Router } from 'express'
import { JwtVerify } from '../Auth/middlewares/jwtVerify'
import authRouter from './auth'
import commentRouter from './comment'
import postRouter from './post'

const mainRouter = Router()
/* auth */
mainRouter.use('/auth', authRouter)
mainRouter.use('/post', postRouter)
mainRouter.use('/comment', commentRouter)
mainRouter.get('/protectec', JwtVerify, (req, res) => {
  res.json({
    message: 'Welcome to protected route'
  })
})
export default mainRouter
