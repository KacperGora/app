import { Request, Response } from 'express'
import { findUserByKey } from '../models/User'
import { getDataBaseServices, Service } from '../models/Service'
import { handleError } from '../utils/authUtils'
import { errors } from '../config/errors'
import { companyService } from '../services/companyService'
import { getDatabaseEventsInPeriod } from '../models/Event'

type CustomRequest = Request & {
  query: {
    start: string
    end: string
  }
}

export const addService = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id
  const foundUser = await findUserByKey('id', userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }
  try {
    const service = { ...req.body, user_id: userId } as Service
    const serviceAlreadyExists = await getDataBaseServices(userId, { search: req.body.service_name })
    if (Boolean(serviceAlreadyExists.length)) {
      return handleError(res, errors.SERVICE_EXISTS)
    }

    await companyService.createService(service)
    res.status(201).json({ message: 'Service created successfully', service })
  } catch (error) {
    console.error('Error creating service:', error)
    res.status(500).json({ error: 'Internal Server Error' })
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

    const services = await companyService.getDatabaseServices(userId, query)
    res.status(200).json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getEventsIncome = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id
    const { start, end } = req.query
    const events = await getDatabaseEventsInPeriod(userId, start, end)
    const income = events.reduce((acc, { price }) => {
      return acc + parseInt(price)
    }, 0)

    const totalIncomeByEvents = events.reduce((acc, { service, price }) => {
      return {
        ...acc,
        [service]: acc[service] ? acc[service] + parseInt(price) : parseInt(price),
      }
    }, {})

    res.status(200).json({ income })
  } catch (error) {
    console.error('Error fetching services:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id
    const { id } = req.body
    await companyService.deleteService(userId, id)
    res.status(200).json({ message: 'Service deleted successfully' })
  } catch (error) {
    console.error('Error deleting service:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
