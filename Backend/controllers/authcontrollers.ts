import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUser, findUser, updateUserPassword } from '../models/User'
import { errors } from '../config/errors'
import { SECRET_KEY } from '../config/env'
import jwt from 'jsonwebtoken'
import { generateAuthToken, handleError, hashUserPassword, validateUserCredentials, validateUserExists } from '../utils/authUtils'
import db from '../db'

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables')
}

const generateAccessToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: '15m',
  })
}
const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_KEY as string, {
    expiresIn: '7d',
  })
}

const saveRefreshToken = async (userId: string, token: string) => {
  await db.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [token, userId])
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const validationError = validateUserCredentials(username, password)

  if (validationError) {
    return handleError(res, errors.USERNAME_AND_PASSWORD_REQUIRED)
  }

  try {
    const existingUser = await findUser(username)
    if (existingUser) {
      return handleError(res, errors.USER_ALREADY_EXISTS)
    }

    const hashedPassword = await hashUserPassword(password)
    const newUser = await createUser({ username, password: hashedPassword })

    res.status(201).json({
      message: 'User created successfully',
      user: { login: newUser.username, id: newUser.id },
    })
  } catch (error) {
    handleError(res, errors.INTERNAL_SERVER_ERROR)
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const validationError = validateUserCredentials(username, password)
  if (validationError) {
    return handleError(res, errors.USERNAME_AND_PASSWORD_REQUIRED)
  }

  try {
    const user = await validateUserExists(username, res)
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return handleError(res, errors.INVALID_CREDENTIALS)
    }
    const token = generateAuthToken(user.id, user.username)
    const refresh_token = generateRefreshToken(user)
    await saveRefreshToken(user.id, refresh_token)
    res.status(200).json({
      message: 'Login successful',
      token,
      refresh_token,
      user: { id: user.id, username: user.username },
    })
  } catch (error) {
    handleError(res, errors.INTERNAL_SERVER_ERROR)
  }
}

export const changePassword = async (req: Request, res: Response) => {
  // const { username, password } = req.body
  // const validationError = validateUserCredentials(username, password)
}

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body
  if (!token) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
    const user = await db.query('SELECT * FROM users WHERE id = $1', [(decoded as jwt.JwtPayload).id])

    if (!user || user.refresh_token !== token) return res.sendStatus(403)

    const newAccessToken = generateAccessToken({ id: user.id })
    res.json({ accessToken: newAccessToken })
  } catch {
    res.sendStatus(403)
  }
}
