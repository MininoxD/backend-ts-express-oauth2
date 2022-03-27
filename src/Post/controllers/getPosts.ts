import { Request, Response } from 'express'
import clientDB from '../../services/database'

export const GetPosts = async (req:Request, res:Response) => {
  const posts = await clientDB.post.findMany()
  return res.json(posts)
}
