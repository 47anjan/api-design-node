import type { Request, Response } from 'express'
import db from '../db/connection.ts'
import { tags } from '../db/schema.ts'

export const getTags = async (req: Request, res: Response) => {
  try {
    const allTags = await db.select().from(tags).orderBy(tags.name)

    res.json({
      tags: allTags,
    })
  } catch (error) {
    console.log({ error })
    res.json({ error: 'Failed to get tags' })
  }
}
