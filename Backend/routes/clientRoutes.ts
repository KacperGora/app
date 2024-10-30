import express from 'express'
import { addClient, deleteClient, getClients } from '../controllers/clientControllers'
import {} from '../'
import authMiddleware from '../middleware/authMiddleWare'

const router = express.Router()

router.post('/addClient', authMiddleware as any, addClient as any)
router.get('/getClient', authMiddleware as any, getClients as any)
router.post('/delete', authMiddleware as any, deleteClient as any)

export default router
