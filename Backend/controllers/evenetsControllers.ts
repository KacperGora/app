import { Request, Response } from 'express'
import { createDataBaseEvent, getDatabaseEvents } from '../models/Event'
interface CustomRequest extends Request {
  user: {
    userId: string
    exp: number
    iat: number
  }
}

export const getEvents = async (req: Request, res: Response) => {
  const userId = req.user.id
  try {
    const events = await getDatabaseEvents(userId)
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: 'Error getting events', error: (error as Error).message })
  }
}

export const createEvent = async (req: Request, res: Response) => {
  const userId = req.user.id

  await createDataBaseEvent({ ...req.body, userId })
}

export const getEventsIncome = async (req: CustomRequest, res: Response) => {}
