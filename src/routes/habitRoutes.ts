import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'habits' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'got one habit' })
})

router.post('/:id', (req, res) => {
  res.json({ message: 'habit created' })
})
router.put('/:id', (req, res) => {
  res.json({ message: 'habit updated' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'habit deleted' })
})

export default router
