import { Router } from 'express';
import { clientControllers } from '../controllers/clientControllers';
import { authenticateToken } from '../middleware/authMiddleWare';

const clientRouter = Router();
const { addClient, deleteClient, getClients } = clientControllers;

clientRouter.use(authenticateToken);

clientRouter.get('/getClient', getClients);
clientRouter.post('/addClient', addClient);
clientRouter.post('/delete', deleteClient);

export default clientRouter;
