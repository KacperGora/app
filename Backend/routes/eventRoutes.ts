import { Router } from 'express';
import { createEvent, getEvents, getEventsFormOptions, updateEvent } from '../controllers/eventsControllers';
import { authenticateToken } from '../middleware/authMiddleWare';

const eventRouter = Router();
eventRouter.use(authenticateToken);
eventRouter.get('/fetchEventOptions', getEventsFormOptions);
eventRouter.get(`/getEvents/`, getEvents);
eventRouter.post('/create', createEvent);
eventRouter.patch('/update', updateEvent);

export default eventRouter;
