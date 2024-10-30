import { Router } from 'express'
import { register, login } from '../controllers/authcontrollers'
import { calendar } from '../controllers/apiControllers'

const apiRouter = Router()

// apiRouter.get('/calendar', authMiddleware, calendar)

export default apiRouter
