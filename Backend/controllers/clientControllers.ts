import { Request, Response } from 'express'
import { createClient, fetchDatabaseClients } from '../models/Client'
import { findUserByKey } from '../models/User'

export const getClients = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id
  const foundUser = await findUserByKey('id', userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }
  try {
    const clients = await fetchDatabaseClients(userId, {})
    res.status(200).json(clients)
  } catch (error) {
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
