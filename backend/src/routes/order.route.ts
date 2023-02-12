// Importing Libraries
import express from 'express';

// Importing dependencies
import { createOrder } from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth';

const orderRoute = express.Router();

/** Trade */
orderRoute.post('/trade', authMiddleware, createOrder);

export default orderRoute;
