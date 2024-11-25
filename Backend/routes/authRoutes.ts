import { Router } from 'express'
import { register, login, changePassword, refreshToken } from '../controllers/authcontrollers'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/change-password', changePassword)

router.post('/refresh-token', refreshToken)
export default router
