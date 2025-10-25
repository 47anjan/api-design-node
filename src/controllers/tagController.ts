import type { Request, Response } from 'express'
import db from '../db/connection.ts'
import { tags } from '../db/schema.ts'
import { eq } from 'drizzle-orm'

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

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body

    const existingTag = await db.query.tags.findFirst({
      where: eq(tags.name, name),
    })

    if (existingTag) {
      return res
        .status(409)
        .json({ error: 'Tag with this name already exists' })
    }

    const [newTag] = await db
      .insert(tags)
      .values({
        name,
        color: color || '#6B7280',
      })
      .returning()

    res.status(201).json({
      message: 'Tag created successfully',
      tag: newTag,
    })
  } catch (error) {
    console.log({ error })
    res.json({ error: 'Failed to create tag' })
  }
}
