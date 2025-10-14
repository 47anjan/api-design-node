import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res.json({ message: 'hello world' }).status(200)
})

export { app }
