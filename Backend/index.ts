import express from 'express'
import { PORT } from './config/env'
import router from './routes/authRoutes'
import eventRouter from './routes/eventRoutes'
import clientRouter from './routes/clientRoutes'
import companyRouter from './routes/companyRouter'

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  next()
})
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

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}
