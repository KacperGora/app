import { Router } from 'express'
import { createEvent, getEvents } from '../controllers/evenetsControllers'
import authMiddleware from '../middleware/authMiddleWare'

const eventRouter = Router()

eventRouter.post('/create', authMiddleware, createEvent)
eventRouter.get(`/getEvents/`, authMiddleware, getEvents)

export default eventRouter
