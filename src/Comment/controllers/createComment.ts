import { Request, Response } from 'express'
import clientDB from '../../services/database'
import { checkjObjectId } from '../../utils/checkObjetId'

interface Params {
    postId: string;
    comment: string
}
export const CreateComment = async (req: Request, res: Response) => {
  const id = res.locals.idUser || ''
  const { postId, comment }:Params = req.body
  if (!(checkjObjectId(postId))) return res.status(400).json({ error: 'id post format is not invalid' })
  try {
    const commentCreate = await clientDB.comment.create({
      data: {
        post: {
          connect: {
            id: postId
          }
        },
        comment,
        user: {
          connect: {
            id
          }
        }
      }
    })
    return res.status(201).json(commentCreate)
  } catch (error) {
    return res.status(400).json({ error: 'Error creating comment' })
  }
}
