import { Router } from 'express'
import { addService, deleteService, getEventsIncome, getServices } from '../controllers/companyControllers'
import { authenticateToken } from '../middleware/authMiddleWare'

const companyRouter = Router()

companyRouter.use(authenticateToken)
companyRouter.get('/calculateIncome', getEventsIncome)
companyRouter.get('/getServices', getServices)
companyRouter.post('/addService', addService)
companyRouter.post('/deleteService', deleteService)

export default companyRouter
