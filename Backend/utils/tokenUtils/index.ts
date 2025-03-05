import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/env';

export const generateAccessToken = (id: string): string => {
  if (!SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined');
  }
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: '15m' });
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY as string, { expiresIn: '7d' });
};
