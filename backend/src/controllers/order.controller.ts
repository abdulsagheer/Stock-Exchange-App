import Order from '../model/Order.model';
import expressAsyncHandler from 'express-async-handler';
import Stock from '../model/Stock.model';
import Api from '../utils/helper';
import User from '../model/User.Model';
import { updateStockPrice } from './stock.controller';

// Method for creating a new stock
export const createOrder = expressAsyncHandler(async (req: any, res: any) => {
	try {
		const user = await User.findOne({ _id: req.body.userId });
		const stock = await Stock.findOne({ symbol: req.body.symbol });
		if (user && user.walletBalance < stock.marketCap * req.body.quantity) {
			return res.status(400).json({ message: 'Insufficient walletBalance' });
		}
		user.walletBalance -= stock.marketCap * req.body.quantity;
		user.portfolio.push({
			symbol: req.body.symbol,
			quantity: req.body.quantity,
		});
		const order = await user.save();
		Api.created(res, { order }, 'Buy order executed successfully');
	} catch (error: any) {
		return Api.serverError(req, res, error, 'Error processing buy order');
	}
});

export const executeSellOrders = expressAsyncHandler(async () => {
	try {
		// find all sell orders with a priceThreshold less than or equal to the current stock marketCap
		const sellOrders = await Order.find({
			type: 'sell',
			priceThreshold: { $lte: marketCap },
			status: 'open',
		});

		// execute the sell orders
		for (const sellOrder of sellOrders) {
			// update the sell order status to executed
			sellOrder.status = 'executed';

			// execute the sell order logic, such as updating the user's portfolio and wallet

			await sellOrder.save();
		}
	} catch (error: any) {
		return Api.serverError(req, res, error, 'Error in executing sell order');
	}
});

export const runExchangeTask = () => {
	updateStockPrice();
	executeSellOrders();
};
