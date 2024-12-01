import { Request, Response } from 'express'
import { errors } from '../config/errors'
import { handleError } from '../utils/authUtils'
import { userService } from '../services/authServices'

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const response = await userService.registerUser(username, password)
    res.status(201).json(response)
  } catch (error) {
    // handleError(res, error)
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const response = await userService.loginUser(username, password)
    res.status(200).json({ data: response })
  } catch (error) {
    handleError(res, errors.INVALID_CREDENTIALS)
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body
  try {
    const newAccessToken = await userService.refreshUserToken(refresh_token)
    res.json({ accessToken: newAccessToken })
  } catch (error) {
    console.error(error)
    res.sendStatus(403)
  }
}
