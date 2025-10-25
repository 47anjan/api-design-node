import { Router } from 'express'
import { createTag, getTags } from '../controllers/tagController.ts'
import z, { string } from 'zod'
import { validateBody } from '../middleware/validation.ts'

const router = Router()

const createTagSchema = z.object({
  name: string().min(3),
  color: string().optional(),
})

router.get('/', getTags)
router.post('/', validateBody(createTagSchema), createTag)

export default router
