import { Router } from 'express'
import authRouter from './auth'
import commentRouter from './comment'
import postRouter from './post'

const mainRouter = Router()
/* auth */
mainRouter.use('/auth', authRouter)
mainRouter.use('/post', postRouter)
mainRouter.use('/comment', commentRouter)
export default mainRouter
