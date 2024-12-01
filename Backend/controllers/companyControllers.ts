import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { findUserByKey } from '../models/User'
import { dbCreateService, fetchDatabaseServices, Service } from '../models/Service'
import { handleError } from '../utils/authUtils'
import { errors } from '../config/errors'
import { getDatabaseServices } from '../services/serviceServices'

export const addService = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id
  const foundUser = await findUserByKey('id', userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }
  try {
    const { service_name, service_description, service_duration, service_price } = req.body
    const service: Service = {
      user_id: userId,
      service_name: service_name,
      service_description: service_description,
      service_price: Number(Number(service_price).toFixed(2)),
      service_duration: Number(service_duration),
    }
    const serviceAlreadyExists = await fetchDatabaseServices(userId, { search: service_name })
    if (Boolean(serviceAlreadyExists.length)) {
      return handleError(res, errors.SERVICE_EXISTS)
    }

    await dbCreateService(service)
    res.status(201).json({ message: 'Service created successfully', service })
  } catch (error) {
    return handleError(res, errors.SERVICE_EXISTS)
  }
}

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id
    const query = {
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'ASC' | 'DESC',
    }

    const services = await getDatabaseServices(userId, query)
    res.status(200).json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
