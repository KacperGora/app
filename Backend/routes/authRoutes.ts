import { Router } from 'express'
import { register, login, changePassword } from '../controllers/authcontrollers'
import authMiddleware from '../middleware/authMiddleWare'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/change-password', changePassword)

// router.post('/refresh-token', authMiddleware as any, refreshToken)
export default router
