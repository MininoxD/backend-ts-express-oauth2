import { Router } from 'express'
import { CheckParams } from '../Auth/middlewares/checkParams'
import { JwtVerify } from '../Auth/middlewares/jwtVerify'
import { CreatePost } from '../Post/controllers/createPost'
import { DeletePost } from '../Post/controllers/deletePost'
import { GetCommentsOnePost } from '../Post/controllers/getCommentsOnePost'
import { GetOnePost } from '../Post/controllers/getOnePost'
import { GetPosts } from '../Post/controllers/getPosts'
/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *     type: object
 *     properties:
 *      id:
 *        type: string
 *      title:
 *        type: string
 *      body:
 *         type: string
 *      userId:
 *         type: string
 *    Comment:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        postId:
 *          type: string
 *        comment:
 *          type: string
 *        userId:
 *          type: string
 */

/**
 * @swagger
 * /post:
 *  get:
 *    description: Get all posts
 *    tags:
 *      - Post
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Post'
 * /post/{id}:
 *   get:
 *    description: Get one post
 *    tags:
 *      - Post
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *       description: Successful operation
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/error'
 *  */

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
