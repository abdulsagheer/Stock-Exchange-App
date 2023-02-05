// Importing Libraries
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
// Importing dependencies
import { validateMongodbID } from '../utils/validateMongodbID';
import { Message } from './../utils/helper';
import Api from '../utils/helper';
import Stock from '../model/Stock.model';

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
			Api.ok(res, { stock }, Message.Created);
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
			validateMongodbID(id);

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
			validateMongodbID(id);

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
			validateMongodbID(id);

			// Delete the stock from the database
			const deletedStocks = await Stock.findByIdAndDelete(id);

			// Return a success message
			Api.ok(res, deletedStocks, 'Stock successfully deleted');
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);
