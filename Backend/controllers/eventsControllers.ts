import { Request, Response } from 'express';
import { createDataBaseEvent, getDatabaseEvents, updateDatabaseEvent } from '../models/Event';
import { handleError } from '../utils/authUtils';
import { errors } from '../config/errors';
import { companyService } from '../services/companyService';
import { clientService } from '../services/clientServices';
interface CustomRequest extends Request {
  user: {
    userId: string;
    exp: number;
    iat: number;
  };
}

export const getEvents = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const events = await getDatabaseEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error getting events', error: (error as Error).message });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'Event data is required' });
    return;
  }
  if (!req.body.price) {
    res.status(400).json({ message: 'Price is required' });
    return;
  }
 
  try {
    await createDataBaseEvent({ ...req.body, userId: req.user.id });
    res.status(200).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: (error as Error).message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const eventId = req.body.id;
  try {
    await updateDatabaseEvent({ ...req.body, userId, id: eventId });
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: (error as Error).message });
  }
};

export const getEventsFormOptions = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const services = (await companyService.getDatabaseServices(userId, {})) || [];
    const clients = (await clientService.getClients(userId, {})) || [];
    res.status(200).json({ services, clients });
  } catch (error) {
    handleError(res, errors.INTERNAL_SERVER_ERROR);
  }
};
export const getEventsIncome = async (req: CustomRequest, res: Response) => {};
