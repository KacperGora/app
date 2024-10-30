import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { v4 as uuidv4 } from 'uuid'

const SECRET_KEY = process.env.SECRET_KEY as string

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables')
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).send('Username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword, id: uuidv4() })
    await newUser.save()
    res.status(201).send('User registered successfully')
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).send('Error registering user')
  }
}

export const login = async (req: Request, res: Response) => {
  console.log('login')
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).send('Invalid username or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).send('Invalid username or password')
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })
    res.status(200).json({ message: 'Login successful', token, user: { login: user.username, id: user._id } })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).send('Error logging in')
  }
}

export const refreshToken = (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY, { ignoreExpiration: true }) as jwt.JwtPayload
    const newToken = jwt.sign({ userId: decoded.userId }, SECRET_KEY, { expiresIn: '1h' })
    res.status(200).json({ message: 'Token refreshed', token: newToken })
  } catch (error) {
    console.error('Invalid token:', error)
    res.status(401).send('Invalid token.')
  }
}
