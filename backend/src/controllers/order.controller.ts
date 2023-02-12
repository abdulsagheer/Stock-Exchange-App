import Order from '../models/Order.model';
import expressAsyncHandler from 'express-async-handler';
import Stock from '../models/Stock.model';
import Api, { Message } from '../utils/helper';
import User from '../models/User.Model';
import { executeSellOrders, updateStockPrice } from './stock.controller';

// Method for creating a new Order
export const createOrder = expressAsyncHandler(async (req: any, res: any) => {
	try {
		const { type, userId, stockId, shares } = req.body;
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
			user.walletBalance -= totalCost;
			user.portfolio.push(stockId);
			await user.save();
		} else if (type === 'sell') {
			const portfolioIndex = user.portfolio.indexOf(stockId);
			if (portfolioIndex === -1) {
				return Api.badRequest(
					res,
					Message.ValidationError,
					'Stock not in portfolio'
				);
			}
			user.walletBalance += shares * stock.price;
			user.portfolio.splice(portfolioIndex, 1);
			await user.save();
		} else {
			return Api.badRequest(res, Message.ValidationError, 'Invalid Order Type');
		}
		const order = new Order({
			type,
			user: userId,
			stock: stockId,
			symbol: stock.symbol,
			shares,
			price: stock.price,
			status: 'executed',
		});
		await order.save();
		Api.created(res, { order }, 'Order executed successfully');
	} catch (error: any) {
		return Api.serverError(req, res, error, 'Error processing order');
	}
});

// Method for running Exchange Task
export const runExchangeTask = () => {
	// Function to run the task every 15 minutes
	setInterval(async () => {
		await updateStockPrice();
		await executeSellOrders();
	}, 15 * 60 * 1000); // 15 minutes in milliseconds
};
