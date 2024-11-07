import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleWare'
import { addService, getServices } from '../controllers/companyControllers'

const companyRouter = Router()

companyRouter.post('/addService', authMiddleware, addService as any)
companyRouter.get('/getServices', authMiddleware, getServices as any)

export default companyRouter
