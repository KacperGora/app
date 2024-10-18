import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { SECRET_KEY } from '../authMiddleware'

export const list = async (req: Request, res: Response) => {
 
}

export const addClient = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email, phone, userId } = req.body
    
}
