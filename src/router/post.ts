import { Router } from 'express'
import { CheckParams } from '../Auth/middlewares/checkParams'
import { JwtVerify } from '../Auth/middlewares/jwtVerify'
import { CreatePost } from '../Post/controllers/createPost'
import { DeletePost } from '../Post/controllers/deletePost'
import { GetCommentsOnePost } from '../Post/controllers/getCommentsOnePost'
import { GetOnePost } from '../Post/controllers/getOnePost'
import { GetPosts } from '../Post/controllers/getPosts'

const postRouter = Router()

postRouter.get('/', GetPosts)
postRouter.get('/:id', GetOnePost)
postRouter.get('/:id/comments', GetCommentsOnePost)
postRouter.delete('/:id',
  JwtVerify,
  DeletePost
)
postRouter.post('/',
  JwtVerify,
  CheckParams({ parameters: ['title', 'body'] }),
  CreatePost
)

export default postRouter
