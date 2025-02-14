import { Request, Response } from 'express';
import { errors } from '../config/errors';
import { compareUserPassword, handleError } from '../utils/authUtils';
import { userService } from '../services/userService';
import { findUserByKey } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const response = await userService.registerUser(username, password);
    res.status(201).json({ data: response });
  } catch (error: any) {
    const [text, errorCode] = String(error).split(': ');
    return handleError(res, errors[errorCode]);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const response = await userService.loginUser(username, password);
    res.status(200).json(response);
  } catch (error) {
    handleError(res, errors.INVALID_CREDENTIALS);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  try {
    const newAccessToken = await userService.refreshUserToken(refresh_token);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    handleError(res, errors.TOKEN_REQUIRED);
  }
};

export const logout = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    await userService.logoutUser(userId);
    res.status(200).send('User logged out');
  } catch (error) {
    handleError(res, errors.TOKEN_REQUIRED);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { userId, newPassword, password } = req.body;
  try {
    const user = await findUserByKey('id', userId);
    const passwordIsValid = await compareUserPassword(password as string, newPassword);

    await userService.changePassword(userId, newPassword);
    res.status(200).send('Password changed successfully');
  } catch (error) {
    handleError(res, errors.INVALID_CREDENTIALS);
  }
};
