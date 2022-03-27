import { Request, Response } from 'express'
import clientDB from '../../services/database'
import { checkjObjectId } from '../../utils/checkObjetId'

export const GetCommentsOnePost = async (req:Request, res:Response) => {
  const id = req.params.id?.toString() || ''
  if (!checkjObjectId(id)) return res.status(400).json({ error: 'id format is not invalid' })
  const comments = await clientDB.comment.findMany({
    where: {
      post: {
        id
      }
    }
  })

  if (!(comments.length > 0)) return res.status(404).json({ error: 'Comments not found' })
  return res.json(comments)
}
