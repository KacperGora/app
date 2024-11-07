import express from 'express'
import { MONGO_URI, PORT } from './config/env'
import apiRouter from './routes/apiRouter'
import router from './routes/authRoutes'
import eventRouter from './routes/eventRoutes'
import clientRouter from './routes/clientRoutes'
import companyRouter from './routes/companyRouter'
import db from './db'
const app = express()

app.use(express.json())

app.use('/auth', router)
app.use('/event', eventRouter)
app.use('/client', clientRouter)
app.use('/company', companyRouter)
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
