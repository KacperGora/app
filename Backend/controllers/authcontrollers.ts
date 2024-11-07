import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import db from '../db'
const SECRET_KEY = process.env.SECRET_KEY as string
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables')
}

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

const generateToken = (id: number, username: string): string => {
  return jwt.sign({ id, username }, SECRET_KEY, { expiresIn: '1h' })
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' })
    }

    const hashedPassword = await hashPassword(password)
    const newUser = await db.one('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', [
      username,
      hashedPassword,
    ])

    res.status(201).json({
      message: 'User created successfully',
      user: { login: newUser.username, id: newUser.id },
    })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user.id, user.username)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username },
    })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export const changePassword = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const hashedPassword = await hashPassword(password)

    await db.none('UPDATE users SET password = $1 WHERE username = $2', [hashedPassword, username])

    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Error changing password:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}