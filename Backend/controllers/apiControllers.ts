import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const calendar = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: new Date().toString() })
  } catch (error) {
    res.status(500).send('Error getting calendar')
  }
}
