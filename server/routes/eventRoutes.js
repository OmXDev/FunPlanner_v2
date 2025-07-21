
import express from 'express';
import { createEvent, getAllEventsOfClient, singleEventWithStats } from '../controllers/event.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/create-event/:id', isAuthenticated, createEvent); 
router.get('/event-stats/:id', isAuthenticated, singleEventWithStats);
router.get('/clients-event-data/:id',isAuthenticated,getAllEventsOfClient);


export default router;
