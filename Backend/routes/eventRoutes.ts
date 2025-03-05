import { Router } from 'express';
import { eventsController } from '../controllers/eventsControllers';
import { authenticateToken } from '../middleware/authMiddleWare';

const { createEvent, getEvents, getEventsFormOptions, updateEvent } = eventsController;

const eventRouter = Router();

eventRouter.use(authenticateToken);
eventRouter.get('/fetchEventOptions', getEventsFormOptions);
eventRouter.get(`/getEvents/`, getEvents);
eventRouter.post('/create', createEvent);
eventRouter.patch('/update', updateEvent);

export default eventRouter;
