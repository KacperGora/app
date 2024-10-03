import { Request, Response } from 'express'
import Event from '../models/Event'

export const getEvents = async (req: Request, res: Response) => {
  try {
    console.log(req.params)
    const events = await Event.find({ userId: req.params.id })
      res.status(200).json(events)
      console.log(events);
  } catch (error) {
    console.error('Error getting events:', error)
    res.status(500).json({ message: 'Error getting events', error: (error as Error).message })
  }
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, userId, start, end } = req.body

    if (!title || !start || !description || !userId) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newEvent = new Event({ title, start, end, description, userId })
    console.log(newEvent)
    await newEvent.save()

    res.status(201).json({ message: 'Event created successfully', event: newEvent })
  } catch (error) {
    console.log(error)
    console.error('Error creating event:', error)
    res.status(500).json({ message: 'Error creating event', error: (error as Error).message })
  }
}
