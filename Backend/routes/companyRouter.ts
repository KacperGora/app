import { Router } from 'express'
import { addService, getEventsIncome, getServices } from '../controllers/companyControllers'
import { authenticateToken } from '../middleware/authMiddleWare'

const companyRouter = Router()

companyRouter.use(authenticateToken)
companyRouter.get('/calculateIncome', getEventsIncome)
companyRouter.get('/getServices', getServices)
companyRouter.post('/addService', addService)

export default companyRouter
