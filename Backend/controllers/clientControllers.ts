import { Request, Response } from 'express';
import { findUserByKey } from '../models/User';
import { handleError } from '../utils/authUtils';
import { errors } from '../config/errors';
import { clientService } from '../services/clientServices';

export const getClients = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id;
  const foundUser = await findUserByKey('id', userId);
  if (!foundUser) {
    res.status(400).send('User not found');
    return;
  }
  try {
    const clients = (await clientService.getClients(userId, req.query)) || [];
    res.status(200).json(clients || []);
  } catch (error) {
    res.status(500).send('Error getting clients');
  }
};

export const addClient = async (req: Request, res: Response): Promise<void> => {
  const { name, last_name, phone_number, notes } = req.body;
  const userId = req.user.id;

  try {
    await clientService.addClient({ name, last_name, phone_number, userId, notes });
    res.status(200).send('Client added');
  } catch (error) {
    const [text, errorCode] = String(error).split(': ');
    return handleError(res, errors[errorCode]);
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  const { client_id } = req.body;
  try {
    await clientService.deleteClient(client_id);
    res.status(200).send('Client deleted');
  } catch (error) {
    res.status(500).send('Error deleting client');
  }
};
