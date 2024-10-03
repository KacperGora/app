import { Router } from 'express'
import { register, login } from '../controllers/authcontrollers'
import authMiddleware from '../middleware/authMiddleWare'
import { calendar } from '../controllers/apiControllers'

const apiRouter = Router()

apiRouter.get('/calendar', authMiddleware, calendar)

export default apiRouter
