import { Request, Response } from 'express'
import Client from '../models/Client'
import User from '../models/User'
import mongoose, { Document } from 'mongoose'
import Event from '../models/Event'
import { v4 as uuidv4 } from 'uuid'

interface CustomRequest extends Request {
  user: {
    userId: string
    exp: number
    iat: number
  }
}

export const getClients = async (req: CustomRequest, res: Response): Promise<void> => {
  console.log('getClients')
  const userId = req.user?.userId
  const foundUser = await User.findById(userId).populate('clientsID')
  console.log(foundUser)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }

  const userClientsId = foundUser.clientsID
  const clients = await Client.find({ id: { $in: userClientsId } })
  const eventsForClients = await Event.find({ clientId: { $in: userClientsId } })
  console.log(clients)
  const clientsWithEvents = clients.map((client) => {
    const clientEvents = eventsForClients.filter((event) => event.clientId === client.id)
    return {
      ...client.toObject(),
      events: clientEvents,
    }
  })
  res.status(200).json(clientsWithEvents)
}

export const addClient = async (req: CustomRequest, res: Response<any, Record<string, any>>): Promise<void> => {
  const { name, lastName, phoneNumber } = req.body
  const userId = req.user.userId

  const foundUser = await User.findById(userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }

  try {
    const newClient = new Client({
      name,
      lastName,
      phoneNumber,
      connectedUser: foundUser.id,
      id: uuidv4(),
    })
    await newClient.save()
    foundUser.clientsID.push(newClient.id)
    await foundUser.save()

    res.status(201).send('Client added successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error adding client')
  }
}

export const deleteClient = async (req: CustomRequest, res: Response<any, Record<string, any>>): Promise<void> => {
  const { clientId } = req.body
  const userId = req.user.userId

  const foundUser = await User.findById(userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }

  try {
    await Client.findByIdAndDelete(clientId)
    foundUser.clientsID = foundUser.clientsID.filter((client: mongoose.Types.ObjectId) => client.toString() !== clientId)
    await foundUser.save()
    console.log('success')
    res.status(200).send('Client deleted successfully')
  } catch (error) {
    res.status(500).send('Error deleting client')
  }
}
