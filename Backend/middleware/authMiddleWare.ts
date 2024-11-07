import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/env'

export interface CustomRequest extends Request {
  user: User
}

type User = {
  userId: string
  exp: number
  iat: number
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]
  console.log(token, 'token');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY as string) as User
    ;(req as CustomRequest).user = decoded
    next()
  } catch (error) {
    res.status(401).send('Invalid token.')
  }
}

export default authMiddleware
