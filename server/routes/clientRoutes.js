import express from 'express';
import {createClient, getAllClientWithStats, getClientStats, singleClientWithStats} from '../controllers/client.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/create-client', isAuthenticated,createClient);
router.get('/clients-with-stats',isAuthenticated ,getAllClientWithStats)
router.get("/get-stats", isAuthenticated, getClientStats);
router.get('/client-stats/:id',isAuthenticated, singleClientWithStats)

export default router;