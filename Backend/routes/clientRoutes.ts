import { Router } from 'express'
import { authMiddleware } from '../authMiddleware'
import { addClient } from '../controllers/clientControllers'

const clientRouter = Router()

// clientRouter.get('/list', authMiddleware, null)
clientRouter.post(`/addClient`, authMiddleware, addClient)

export default clientRouter
