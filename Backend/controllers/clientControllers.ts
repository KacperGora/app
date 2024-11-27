import { Request, Response } from 'express'
import { findUserById } from '../models/User'
import { createClient, getAllClients } from '../models/Client'

export const getClients = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id
  const foundUser = await findUserById(userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }
  try {
    const clients = await getAllClients(userId)
    res.status(200).json(clients)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error getting clients')
  }
}

export const addClient = async (req: Request, res: Response): Promise<void> => {
  const { name, last_name, phone_number, notes } = req.body
  const userId = req.user.id

  try {
    await createClient({ name, last_name, phone_number, userId, notes })
  } catch (error) {
    res.status(500).send('Error adding client')
  }
}

export const deleteClient = async (req: Request, res: Response): Promise<void> => {}
