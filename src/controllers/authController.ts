import type { Response, Request } from 'express'
import { users, type NewUser } from '../db/schema.ts'
import { db } from '../db/connection.ts'
import { comparePassword, hashPassword } from '../utils/passwords.ts'
import { generateToken } from '../utils/jwt.ts'
import { eq } from 'drizzle-orm'

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

export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body

    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return res.json({ error: 'Invalid credentials' })
    }

    const isValidPassword = await comparePassword(password, user.password)
    console.log(isValidPassword)

    if (!isValidPassword) {
      return res.json({ error: 'Invalid credentials' })
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    return res
      .json({
        message: 'Login successful!',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      })
      .status(201)
  } catch (error) {
    console.log({ error })
    res.json('Login failed').status(500)
  }
}
