import { Router } from 'express'
import { createEvent, getEvents } from '../controllers/evenetsControllers'
import authMiddleware from '../middleware/authMiddleWare'

const eventRouter = Router()

eventRouter.post('/create', authMiddleware, createEvent as any)
eventRouter.get(`/getEvents/`, authMiddleware, getEvents as any)
// eventRouter.get('/getIncome', authMiddleware, getEventsIncome as any)

export default eventRouter
