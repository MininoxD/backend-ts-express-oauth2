import { Request, Response } from 'express'
import clientDB from '../../services/database'
interface Params {
    title: string
    body: string
}
export const CreatePost = async (req:Request, res:Response) => {
  const id = res.locals.idUser || ''
  const { title, body }:Params = req.body
  try {
    const postCreate = await clientDB.post.create({
      data: {
        title,
        body,
        user: {
          connect: {
            id
          }
        }
      }
    })

    return res.status(201).json(postCreate)
  } catch (error) {
    return res.status(400).json({ error: 'Error creating post' })
  }
}
