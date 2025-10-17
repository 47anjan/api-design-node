import { Router } from 'express'

const router = Router()

router.post('/register', (req, res) => {
  res.json({ message: 'user created' })
})

router.post('/login', (req, res) => {
  res.json({ message: 'user login' })
})

export default router
