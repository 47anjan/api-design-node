import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import db from '../db/connection.ts'
import { users } from '../db/schema.ts'
import { eq } from 'drizzle-orm'

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!?.id

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, userId))

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.log({
      error,
    })

    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id
    const { lastName, firstName, username, email } = req.body

    const [updatedUser] = await db
      .update(users)
      .set({
        lastName,
        firstName,
        email,
        username,
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        updatedAt: users.updatedAt,
      })

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ error: 'Failed to update profile' })
  }
}
