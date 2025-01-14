import e, { Router } from 'express'
import { createEvent, getEvents, getEventsFormOptions, updateEvent } from '../controllers/eventsControllers'
import { authenticateToken } from '../middleware/authMiddleWare'

const eventRouter = Router()
eventRouter.use(authenticateToken)
eventRouter.post('/create', createEvent)
eventRouter.get(`/getEvents/`, getEvents)
eventRouter.get('/fetchEventOptions', getEventsFormOptions)
eventRouter.patch('/update', updateEvent)

export default eventRouter
