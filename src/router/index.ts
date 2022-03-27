import { Router } from 'express'
import authRouter from './auth'
import commentRouter from './comment'
import postRouter from './post'

/**
 * @swagger
 * tags:
 *  - name: Auth
 *    description: Multiple methods Authentication
 *  - name: Post
 *    description: Multiple methods for Post
 *  - name: Comment
 *    description: Multiple methods for comments
 *
 * */
const mainRouter = Router()
/* auth */
mainRouter.use('/auth', authRouter)
mainRouter.use('/post', postRouter)
mainRouter.use('/comment', commentRouter)
export default mainRouter
