import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { SECRET_KEY } from '../authMiddleware'

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(req.body);
  const user = await User.findOne({ username })
  if (user) {
    return res.status(400).send('Username already exists')
  }
  try {

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()
    res.status(201).send('User registered successfully')
  } catch (error) {
    res.status(500).send('Error registering user')
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(req.body)
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
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).send('Error logging in')
  }
}
