import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import db from '../db/connection.ts'
import { habits, habitTags } from '../db/schema.ts'

export const createHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description, frequency, tagIds, targetCount } = res.req.body

    const userId = req.user!?.id

    const result = await db.transaction(async (tx) => {
      const [newHabit] = await tx
        .insert(habits)
        .values({
          userId,
          name,
          description,
          frequency,
          targetCount,
        })
        .returning()

      if (tagIds && tagIds.length > 0) {
        const habitTagsValues = tagIds.map((tagId: string) => ({
          habitId: newHabit.id,
          tagId,
        }))

        await tx.insert(habitTags).values(habitTagsValues)
      }

      return newHabit
    })

    res.status(201).json({
      message: 'Habit created successfully',
      habit: result,
    })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ error: 'Failed to create habit' })
  }
}
