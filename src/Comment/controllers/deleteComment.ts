import { Request, Response } from 'express'
import clientDB from '../../services/database'
import { checkjObjectId } from '../../utils/checkObjetId'

export const DeleteComment = async (req:Request, res:Response) => {
  const idComment = req.params.id?.toString() || ''
  const id = res.locals.idUser || ''

  if (!checkjObjectId(idComment)) return res.status(400).json({ error: 'id format is not invalid' })
  try {
    const comment = await clientDB.comment.findUnique({
      where: {
        id: idComment
      }
    })
    if (!comment) return res.status(404).json({ error: 'Comment not found' })
    if (comment?.userId !== id) return res.status(401).json({ error: 'This comment is not owned by you' })
    await clientDB.comment.delete({
      where: {
        id: comment.id
      }
    })
    return res.json({ message: 'Comment deleted' })
  } catch (error) {
    console.log(error)

    return res.status(400).json({ error: 'Error deleting comment' })
  }
}
