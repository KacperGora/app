import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config/env'

export const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: '5s' })
}

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY as string, { expiresIn: '7d' })
}
