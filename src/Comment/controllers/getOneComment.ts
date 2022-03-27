import { Request, Response } from 'express'
import clientDB from '../../services/database'
import { checkjObjectId } from '../../utils/checkObjetId'

export const GetOneComment = async (req:Request, res:Response) => {
  const id = req.params.id?.toString() || ''
  if (!checkjObjectId(id)) return res.status(400).json({ error: 'id format is not invalid' })
  const comment = await clientDB.comment.findUnique({
    where: {
      id
    }
  })

  if (!comment) return res.status(404).json({ error: 'Comment not found' })
  return res.json(comment)
}
