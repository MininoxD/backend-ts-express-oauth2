import { Router } from 'express'
import { CheckParams } from '../Auth/middlewares/checkParams'
import { JwtVerify } from '../Auth/middlewares/jwtVerify'
import { CreateComment } from '../Comment/controllers/createComment'
import { DeleteComment } from '../Comment/controllers/deleteComment'
import { GetOneComment } from '../Comment/controllers/getOneComment'

const commentRouter = Router()
commentRouter.get('/:id', GetOneComment)
commentRouter.post('/',
  JwtVerify,
  CheckParams({ parameters: ['postId', 'comment'] }),
  CreateComment
)
commentRouter.delete('/:id', JwtVerify, DeleteComment)

export default commentRouter
