import Order from '../models/Order.model';
import expressAsyncHandler from 'express-async-handler';
import Stock from '../models/Stock.model';
import Api, { Message } from '../utils/helper';
import User from '../models/User.Model';
import { updateStockPrice } from './stock.controller';
import { Request, Response } from 'express';

// Method for creating a new Order
export const createOrder = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			const { type, userId, stockId, shares, price } = req.body;
			const user = await User.findById(userId);
			const stock = await Stock.findById(stockId);
			if (!user || !stock) {
				return Api.badRequest(
					res,
					Message.ValidationError,
					'User or Stock not found'
				);
			}

			if (type === 'buy') {
				const totalCost = shares * stock.price;
				if (user.walletBalance < totalCost) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						'Not enough balance'
					);
				}

				const availableStockPercentage = stock.sharesIssued / stock.marketCap;
				if (shares / stock.sharesIssued > availableStockPercentage) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						`Cannot buy more than ${
							availableStockPercentage * 100
						}% of available shares`
					);
				}

				user.walletBalance -= totalCost;
				user.portfolio.push(stockId);

				const order = new Order({
					type,
					user: userId,
					stock: stockId,
					symbol: stock.symbol,
					shares,
					price: stock.price,
					status: 'executed',
				});

				await Promise.all([user.save(), order.save()]);

				Api.created(res, { order }, 'Order created successfully');
			} else if (type === 'sell') {
				const portfolioIndex = user.portfolio.indexOf(stockId);
				if (portfolioIndex === -1) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						'Stock not in portfolio'
					);
				}

				const order = new Order({
					type,
					user: userId,
					stock: stockId,
					symbol: stock.symbol,
					shares,
					price,
					status: 'open',
				});

				const availableShares = Math.floor(
					(stock.sharesIssued * stock.percentageDiluted) / 100
				);
				if (shares > availableShares) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						`Cannot sell more than ${availableShares} shares`
					);
				}

				user.walletBalance += shares * price;
				user.portfolio.splice(portfolioIndex, 1);

				await Promise.all([user.save(), order.save()]);

				Api.created(res, { order }, 'Order created successfully');
			} else {
				return Api.badRequest(
					res,
					Message.ValidationError,
					'Invalid Order Type'
				);
			}
		} catch (error: any) {
			return Api.serverError(req, res, error, 'Error processing order');
		}
	}
);

// Method for running Exchange Task
export const runExchangeTask = expressAsyncHandler(
	async (req: any, res: any, next: any) => {
		// Function to run the task every 15 minutes
		setInterval(async () => {
			await updateStockPrice(req, res, next);
		}, 15 * 60 * 1000); // 15 minutes in milliseconds
	}
);
