import express from 'express'
import { connectDb } from './db'
import { MONGO_URI, PORT } from './config/env'
import router from './routes/authROutes'
import { authMiddleware } from './authMiddleware'
import apiRouter from './routes/apiRouter'

const app = express()

app.use(express.json())

connectDb(MONGO_URI)

app.use('/auth', router)
app.use('/api', apiRouter)
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
