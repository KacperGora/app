import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const SECRET_KEY = 'your_secret_key' // Replace with your actual secret key

interface CustomRequest extends Request {
  user?: any
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}
