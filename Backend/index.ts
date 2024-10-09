import express from 'express'
import { connectDb } from './db'
import { MONGO_URI, PORT } from './config/env'
import { authMiddleware } from './authMiddleware'
import apiRouter from './routes/apiRouter'
import router from './routes/authRoutes'
import eventRouter from './routes/eventRoutes'

const app = express()

app.use(express.json())

connectDb(MONGO_URI)

app.use('/auth', router)
app.use('/api', apiRouter)
app.use('/event', eventRouter)

app.get('/', (req, res) => {
  res.send('amigo siemanko!')
})

app.get('/elo', (req, res) => {
  res.send('Elo Kacperek co tm')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
