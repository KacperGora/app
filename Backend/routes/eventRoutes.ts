import { Router } from 'express'
import { createEvent, getEvents } from '../controllers/eventsControllers'
import { authenticateToken } from '../middleware/authMiddleWare'

const eventRouter = Router()
eventRouter.use(authenticateToken)
eventRouter.post('/create', createEvent)
eventRouter.get(`/getEvents/`, getEvents)

export default eventRouter
