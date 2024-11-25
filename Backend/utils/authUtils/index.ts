import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { errors } from '../../config/errors'
import { findUser } from '../../models/User'
import { SECRET_KEY } from '../../config/env'
import { Response } from 'express'

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables')
}

const TOKEN_EXPIRY = '1h'

export const hashUserPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const generateAuthToken = (id: number, username: string): string => {
  return jwt.sign({ id, username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY || '1h' })
}

export const validateUserCredentials = (username: string, password: string) => {
  if (!username || !password) {
    return errors.USERNAME_AND_PASSWORD_REQUIRED
  }
  return null
}

export const handleError = (res: Response, error: { code: string; message: string; status: number }) => {
  res.status(error.status).json({ message: error.message, code: error.code })
}

export const validateUserExists = async (username: string, res: Response) => {
  const user = await findUser(username)
  if (!user) {
    return handleError(res, errors.USER_NOT_FOUND)
  }
  return user
}
