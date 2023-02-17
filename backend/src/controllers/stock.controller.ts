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
			const {
				name,
				symbol,
				marketCap,
				price,
				percentageDiluted,
				sharesIssued,
			} = req.body;

			// Create a new stock object
			const newStock = new Stock({
				name,
				symbol,
				price,
				marketCap,
				percentageDiluted,
				sharesIssued,
			});
			await newStock.save();
			// Return the created stock
			Api.created(res, newStock, 'Stock Added Successfully!!');
		} catch (error: any) {
			console.log('Error: ', error, 'error message: ', error.message);
			return Api.serverError(req, res, error, error.message);
			// return Api.serverError(req, res, error, Message.ServerError);
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
			return Api.serverError(req, res, error, Message.ServerError);
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
			return Api.serverError(req, res, error, Message.ServerError);
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
			return Api.serverError(req, res, error, Message.ServerError);
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
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

// Function to update stock prices
export const updateStockPrice = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			// Find all stocks
			const stocks = await Stock.find();
			// loop through each stock and update the price
			stocks.forEach(async (stock) => {
				// generate a random number between 0 and 1
				const random = Math.random();
				// calculate the new price based on the random number and the current price
				const newPrice = random > 0.5 ? stock.price * 1.05 : stock.price * 0.95;
				// update the stock price in the database
				await Stock.updateOne({ _id: stock._id }, { price: newPrice });
				// find all sell orders for this stock with a price less than or equal to the new price
				const sellOrders = await Order.find({
					type: 'sell',
					stock: stock._id,
					price: { $lte: newPrice },
					status: 'open',
				});
				// execute each sell order and update the user's portfolio and wallet balance
				sellOrders.forEach(async (order) => {
					const user = await User.findById(order.user);
					if (user) {
						user.walletBalance += order.shares * (order.price ?? 0);
						user.portfolio.push(order.stock);
						await Order.updateOne({ _id: order._id }, { status: 'executed' });
						await user.save();
					}
				});
			});
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);
