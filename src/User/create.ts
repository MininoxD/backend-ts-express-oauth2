import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()
export const UserCreate = async (
  user: Omit<User, 'id'>
  | Pick<User, 'email' | 'password' | 'hash' | 'createHash'>
  | Pick<User, 'idGoogle' | 'email'>
  | Pick<User, 'idFacebook' | 'email'>
  | Pick<User, 'phone' | 'hash' | 'createHash'>
) => {
  const newUser = await prisma.user.create({
    data: {
      ...user
    }
  })
  const { password, hash: token, createHash, ...restUser } = newUser
  return restUser
}
