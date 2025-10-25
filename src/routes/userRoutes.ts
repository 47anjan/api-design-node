import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/userController.ts'
import z from 'zod'
import { validateBody } from '../middleware/validation.ts'

const updateProfileSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long')
    .optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
})

const router = Router()

router.get('/profile', getProfile)

router.put('/profile', validateBody(updateProfileSchema), updateProfile)

export default router
