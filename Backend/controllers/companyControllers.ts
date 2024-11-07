import { Request, Response } from 'express'
import Client from '../models/Client'
import User from '../models/User'
import mongoose, { Document } from 'mongoose'
import Event from '../models/Event'
import { v4 as uuidv4 } from 'uuid'
import Service from '../models/Service'

interface CustomRequest extends Request {
  user: {
    userId: string
    exp: number
    iat: number
  }
}

export const addService = async (req: CustomRequest, res: Response): Promise<void> => {
  const { serviceName, serviceDescription, servicePrice, serviceDuration } = req.body
  const userId = req.user.userId
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }
  console.log(foundUser)

  try {
    const newService = new Service({
      serviceName,
      serviceDescription,
      servicePrice,
      serviceDuration,
      connectedUser: foundUser.id,
      id: uuidv4(),
    })
    await newService.save()
    foundUser.servicesID.push(newService.id)
    await foundUser.save()
    console.log(newService)
    res.status(201).json(newService)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error adding service')
  } finally {
    console.log('finally')
  }
}

export const getServices = async (req: CustomRequest, res: Response): Promise<void> => {
  const userId = req.user.userId
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    res.status(400).send('User not found')
    return
  }
  console.log(foundUser)
  try {
    const services = await Service.find({ connectedUser: foundUser.id })
    res.status(200).json(services)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error getting services')
  } finally {
    console.log('finally')
  }
}
