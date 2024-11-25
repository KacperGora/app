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

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
