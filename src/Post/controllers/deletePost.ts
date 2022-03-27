import { Request, Response } from 'express'
import clientDB from '../../services/database'
import { checkjObjectId } from '../../utils/checkObjetId'

export const DeletePost = async (req:Request, res:Response) => {
  const id = res.locals.idUser || ''
  const idPost = req.params.id.toString() || ''
  if (!checkjObjectId(idPost)) return res.status(400).json({ error: 'id format is not invalid' })
  try {
    const post = await clientDB.post.findUnique({
      where: {
        id: idPost
      }
    })
    if (!post) return res.status(404).json({ error: 'Post not found' })
    if (post?.userId !== id) return res.status(401).json({ error: 'This publication is not owned by you' })
    await clientDB.post.delete({
      where: {
        id: post.id
      }
    })
    return res.status(200).json({ message: 'Post deleted' })
  } catch (error) {
    console.log(error)

    return res.status(400).json({ error: 'Error deleting post' })
  }
}
