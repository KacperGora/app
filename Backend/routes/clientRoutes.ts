import express from 'express'
import { addClient, deleteClient, getClients } from '../controllers/clientControllers'
import { authenticateToken } from '../middleware/authMiddleWare'

const router = express.Router()

router.use(authenticateToken)
router.get('/getClient', getClients)
router.post('/addClient', addClient)
router.post('/delete', deleteClient)

export default router
