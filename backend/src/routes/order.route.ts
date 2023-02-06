// Importing Libraries
import express from 'express';

// Importing dependencies
import {
	createOrder,
	executeSellOrders,
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth';

const stockRoute = express.Router();

/** Get create stocks */
stockRoute.post('/buy', authMiddleware, createOrder);

/** Fetch stock by id */
stockRoute.put('/sell', authMiddleware, executeSellOrders);

// /** Delete all stocks */
// stockRoute.delete('/:id', authMiddleware, deleteStock);

// /** Fetch all stocks */
// stockRoute.get('/', authMiddleware, getStocks);

// /** Fetch Single User Details By ID */
// stockRoute.get('/:id', authMiddleware, getStockById);

export default stockRoute;
