import { Router } from 'express'
import { register, login, refreshToken } from '../controllers/authcontrollers'
import authMiddleware from '../middleware/authMiddleWare'

const router = Router()

router.post('/register', register)
router.post('/login', login)

router.post('/refresh-token', authMiddleware as any, refreshToken)
export default router
