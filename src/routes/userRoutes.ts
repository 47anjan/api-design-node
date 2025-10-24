import { Router } from 'express'
import { getProfile } from '../controllers/userController.ts'

const router = Router()

router.get('/profile', getProfile)

export default router
