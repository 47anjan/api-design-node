import { Router } from 'express'
import z from 'zod'
import { validateBody, validateParams } from '../middleware/validation.ts'
const router = Router()

const createHabitSchema = z.object({
  name: z.string(),
})
const completeHabitSchema = z.object({
  id: z.string(),
})

router.get('/', (req, res) => {
  res.json({ message: 'habits' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'got one habit' })
})

router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.json({ message: 'habit created' })
})

router.post(
  '/:id/complete',
  validateParams(completeHabitSchema),
  validateBody(createHabitSchema),
  (req, res) => {
    res.json({ message: 'habit completed' })
  }
)

router.put('/:id', (req, res) => {
  res.json({ message: 'habit updated' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'habit deleted' })
})

export default router
