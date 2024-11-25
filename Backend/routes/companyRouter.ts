import { Router } from 'express'
import { addService, getServices } from '../controllers/companyControllers'
import { authenticateToken } from '../middleware/authMiddleWare'

const companyRouter = Router()
companyRouter.use(authenticateToken)
companyRouter.post('/addService', addService)
companyRouter.get('/getServices', getServices)

export default companyRouter
