import { Router } from 'express'
import { createEvent, getEvents } from '../controllers/evenetsControllers'
import { authMiddleware } from '../authMiddleware'

const eventRouter = Router()

eventRouter.post('/create', authMiddleware, createEvent)
eventRouter.get(`/getEvents/:id`, authMiddleware, getEvents)

export default eventRouter