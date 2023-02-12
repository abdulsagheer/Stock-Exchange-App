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

const stockRoute = express.Router();

/** Get create stocks */
stockRoute.post('/create', authMiddleware, isAdmin, createStock);

/** Fetch stock by id */
stockRoute.put('/:id', authMiddleware, isAdmin, updateStock);

/** Delete all stocks */
stockRoute.delete('/:id', authMiddleware, isAdmin, deleteStock);

/** Fetch all stocks */
stockRoute.get('/', authMiddleware, isAdmin, getStocks);

/** Fetch Single User Details By ID */
stockRoute.get('/:id', authMiddleware, isAdmin, getStockById);

export default stockRoute;
