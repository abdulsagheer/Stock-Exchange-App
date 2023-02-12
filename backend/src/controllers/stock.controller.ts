// Importing Libraries
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
// Importing dependencies
import { validateMongodbID } from '../utils/validateMongodbID';
import { Message } from './../utils/helper';
import Api from '../utils/helper';
import Stock from '../models/Stock.model';
import Order from '../models/Order.model';
import User from '../models/User.Model';

// Method for creating a new stock
export const createStock = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			// Destructure the request body
			const { name, symbol, marketCap, percentageDiluted, sharesIssued } =
				req.body;

			// Create a new stock object
			const newStock = new Stock({
				name,
				symbol,
				marketCap,
				percentageDiluted,
				sharesIssued,
			});

			// Save the stock to the database
			const stock = await newStock.save();

			// Return the created stock
			Api.created(res, { stock }, Message.Created);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

// Method for retrieving all stocks
export const getStocks = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			// Retrieve all stocks from the database
			const stocks = await Stock.find();

			// Return the stocks
			Api.ok(res, { stocks }, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);
// Method for retrieving a specific stock
export const getStockById = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			// Destructure the request params
			const { id } = req.params;
			validateMongodbID(req, res, id);

			// Retrieve the stock from the database
			const stock = await Stock.findById(id);

			// Return the stock
			Api.ok(res, { stock }, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);
// Method for updating a specific stock
export const updateStock = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			// Destructure the request params and body
			const { id } = req.params;
			validateMongodbID(req, res, id);

			const { name, symbol, marketCap, percentageDiluted, sharesIssued } =
				req.body;

			// Update the stock in the database
			const stock = await Stock.findByIdAndUpdate(
				id,
				{
					name,
					symbol,
					marketCap,
					percentageDiluted,
					sharesIssued,
				},
				{ new: true }
			);

			// Return the updated stock
			Api.ok(res, { stock }, Message.UpdateSuccessful);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

// Method for deleting a specific stock
export const deleteStock = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			// Destructure the request params
			const { id } = req.params;
			validateMongodbID(req, res, id);

			// Delete the stock from the database
			const deletedStocks = await Stock.findByIdAndDelete(id);

			// Return a success message
			Api.ok(res, deletedStocks, 'Stock successfully deleted');
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

// Function to update stock prices
export const updateStockPrice = expressAsyncHandler(async () => {
	// Find all stocks
	const stocks = await Stock.find({});

	// Loop through stocks and update price
	for (const stock of stocks) {
		// Generate a random number between -1 and 1
		const random = Math.random() * 2 - 1;

		// Calculate new price
		const newPrice = stock.price * (1 + 0.05 * random);

		// Update stock price
		await Stock.findByIdAndUpdate(stock._id, { price: newPrice });
	}
});

// Function to execute sell orders
export const executeSellOrders = expressAsyncHandler(async () => {
	// Find all sell orders with open status
	const sellOrders = await Order.find({ type: 'sell', status: 'open' });

	// Loop through sell orders
	for (const sellOrder of sellOrders) {
		// Find the corresponding stock
		const stock = await Stock.findById(sellOrder.stock);

		// If stock price is less than or equal to sell order price, execute sell order
		if (stock.price <= sellOrder.price) {
			// Update order status to executed
			await Order.findByIdAndUpdate(sellOrder._id, { status: 'executed' });

			// Update user wallet balance
			const user = await User.findById(sellOrder.user);
			await User.findByIdAndUpdate(user._id, {
				walletBalance: user.walletBalance + sellOrder.price * sellOrder.shares,
			});

			// Update stock shares issued
			await Stock.findByIdAndUpdate(stock._id, {
				sharesIssued: stock.sharesIssued - sellOrder.shares,
			});
		}
	}
});
