import { Request, Response } from 'express'
import Event from '../models/Event'
import User from '../models/User'
import Client, { IClient } from '../models/Client'
import { v4 as uuidv4 } from 'uuid'
interface CustomRequest extends Request {
  user: {
    userId: string
    exp: number
    iat: number
  }
}

export const getEvents = async (req: Request, res: Response) => {
  console.log('getEvents')
  // const userId = req.user.userId
  // try {
  //   const events = await Event.find({ userId: userId }).populate('userId')
  //   const eventsWithClientName = await Promise.all(
  //     events.map(async (event) => {
  //       const client = (await Client.findOne({
  //         id: event.clientId,
  //       })) as IClient
  //       return {
  //         ...event.toObject(),
  //         clientName: `${client.name} ${client.lastName}`,
  //       }
  //     }),
  //   )
  //   res.status(200).json(eventsWithClientName)
  // } catch (error) {
  //   res.status(500).json({ message: 'Error getting events', error: (error as Error).message })
  // }
}

export const createEvent = async (req: Request, res: Response) => {
  // const userId = req.user.userId
  // const foundUser = await User.findById(userId)
  // if (!foundUser) {
  //   res.status(400).send('User not found')
  //   return
  // }
  // const { service, start, end, clientId, notes } = req.body
  // const foundClient = await Client.findOne({ id: clientId })
  // if (!foundClient) {
  //   res.status(400).send('Client not found')
  //   return
  // }
  // try {
  //   const newEvent = new Event({
  //     service,
  //     start,
  //     end,
  //     clientId,
  //     notes,
  //     userId,
  //     id: uuidv4(),
  //   })
  //   foundUser.eventsID.push(newEvent.id)
  //   await foundUser.save()
  //   await newEvent.save()
  //   res.status(201).send('Event added successfully')
  // } catch (error) {
  //   console.error('Error adding event:', error)
  //   res.status(500).send('Error adding event')
  // }
}
