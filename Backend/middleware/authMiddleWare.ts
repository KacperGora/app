import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env';

export interface User {
  id: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'NO_TOKEN' });
  }

  if (!SECRET_KEY) {
    return res.status(500).json({ error: 'SECRET_KEY_NOT_DEFINED' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'INCORRECT_TOKEN' });
    }
    if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
      return res.status(403).json({ error: 'INVALID_TOKEN_STRUCTURE' });
    }

    req.user = { id: decoded.id } as User;
    next();
  });
};
