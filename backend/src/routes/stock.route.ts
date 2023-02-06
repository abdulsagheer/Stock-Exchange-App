// Importing Libraries
import express from 'express';

// Importing dependencies
import {
	createStock,
	getStocks,
	getStockById,
	deleteStock,
	updateStock,
} from '../controllers/stock.controller';
import { authMiddleware } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';

const orderRoute = express.Router();

/** Get create stocks */
orderRoute.post('/create', authMiddleware, isAdmin, createStock);

/** Fetch stock by id */
orderRoute.put('/:id', authMiddleware, isAdmin, updateStock);

/** Delete all stocks */
orderRoute.delete('/:id', authMiddleware, isAdmin, deleteStock);

/** Fetch all stocks */
orderRoute.get('/', authMiddleware, isAdmin, getStocks);

/** Fetch Single User Details By ID */
orderRoute.get('/:id', authMiddleware, isAdmin, getStockById);

export default orderRoute;
