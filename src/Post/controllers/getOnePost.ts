import { Request, Response } from 'express'
import clientDB from '../../services/database'
import { checkjObjectId } from '../../utils/checkObjetId'

export const GetOnePost = async (req:Request, res:Response) => {
  const id = req.params.id?.toString() || ''
  if (!checkjObjectId(id)) return res.status(400).json({ error: 'id format is not invalid' })
  const post = await clientDB.post.findUnique({
    where: {
      id
    }
  })

  if (!post) return res.status(404).json({ error: 'Post not found' })
  return res.json(post)
}
