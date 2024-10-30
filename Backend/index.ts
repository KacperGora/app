import express from 'express'
import { connectDb } from './db'
import { MONGO_URI, PORT } from './config/env'
import apiRouter from './routes/apiRouter'
import router from './routes/authRoutes'
import eventRouter from './routes/eventRoutes'
import clientRouter from './routes/clientRoutes'

const app = express()

app.use(express.json())

connectDb(MONGO_URI)

app.use('/auth', router)
app.use('/event', eventRouter)
app.use('/client', clientRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
