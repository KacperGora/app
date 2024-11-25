import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { findUserById } from '../models/User'
import { dbCreateService, dbGetServices, Service } from '../models/Service'

interface CustomRequest extends Request {
  user: {
    userId: string
    exp: number
    iat: number
  }
}

export const addService = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id
  const foundUser = await findUserById(userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }
  try {
    const service: Service = {
      user_id: userId,
      service_name: req.body.service_name,
      service_description: req.body.service_description,
      service_price: Number(Number(req.body.service_price).toFixed(2)),
      service_duration: Number(req.body.service_duration),
    }
    await dbCreateService(service)
  } catch (error) {
    res.status(500).send('Error adding service')
  }
}
export const getServices = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id
  const { query } = req
  const sortBy = query.sortBy as keyof Service
  const sortOrder = query.sortOrder as 'ASC' | 'DESC'
  try {
    const services = await dbGetServices(userId, { ...query, sortBy, sortOrder, search: query.search as string })
    const servicesWithNoUserIds = services.map((service) => {
      delete service.user_id
      return service
    })
    console.log(servicesWithNoUserIds)
    res.status(200).json(servicesWithNoUserIds)
  } catch (error) {
    res.status(500).send('Error getting services')
  }
}
