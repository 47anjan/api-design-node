import type { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import { users, type NewUser } from '../db/schema.ts'
import { db } from '../db/connection.ts'
import { hashPassword } from '../utils/passwords.ts'
import { generateToken } from '../utils/jwt.ts'

export const register = async (
  req: Request<any, any, NewUser>,
  res: Response
) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)

    const [user] = await db
      .insert(users)
      .values({
        ...req.body,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
      })

    const token = await generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    })

    res
      .json({
        message: 'User created',
        user,
        token,
      })
      .status(201)
  } catch (error) {
    console.log({ error })
    res.json({ message: 'Failed to create user!' }).status(500)
  }
}
