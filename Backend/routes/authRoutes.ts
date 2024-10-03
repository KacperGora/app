import { Router } from 'express'
import { register, login } from '../controllers/authcontrollers'
import authMiddleware from '../middleware/authMiddleWare'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/remindPassword', (req, res) => {
  res.status(200).json({ message: 'Password reminder sent' })
})

router.get('/calendar', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'xD' })
})
router.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route')
})

export default router
