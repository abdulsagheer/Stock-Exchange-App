import Order from '../models/Order.model';
import expressAsyncHandler from 'express-async-handler';
import Stock from '../models/Stock.model';
import Api, { Message } from '../utils/helper';
import User from '../models/User.Model';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/User';
import { ObjectId } from 'mongoose';
import { PortfolioItem } from '../interfaces/Portfolio';

// Method for creating a new Order
export const createOrder = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const {
				type,
				userId,
				stockId,
				shares,
				price,
			}: {
				type: string;
				userId: string;
				stockId: ObjectId;
				shares: number;
				price: number;
			} = req.body;

			const user: IUser | null = await User.findById(userId).populate(
				'portfolio'
			);
			const stock = await Stock.findById(stockId);

			if (!userId || !stockId || !shares) {
				return Api.badRequest(
					res,
					Message.ValidationError,
					'All fields are required'
				);
			}
			if (!Number.isInteger(shares) || shares <= 0) {
				return Api.badRequest(
					res,
					Message.ValidationError,
					'Invalid number of shares'
				);
			}

			if (type === 'buy') {
				const totalCost = shares * stock!.price!;
				if (!user || user.walletBalance < totalCost) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						'Insufficient balance'
					);
				}

				// Check if user can buy the requested number of shares
				if (stock!.sharesIssued < shares) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						'Not enough shares available'
					);
				}

				// Create buy order
				const order = new Order({
					type: 'buy',
					user: userId,
					stock: stockId,
					symbol: stock!.symbol!,
					price: stock!.price!,
					shares,
					status: 'open',
				});

				user.walletBalance -= totalCost;

				user.portfolio.push(stockId);

				await Promise.all([user.save(), order.save()]);
				Api.created(res, { order }, 'Order created successfully');
			} else if (type === 'sell') {
				// Check that the user has enough shares of the stock to sell
				const portfolioIndex = user?.portfolio?.indexOf(stockId);
				if (portfolioIndex === undefined || portfolioIndex === -1) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						'Stock not in portfolio'
					);
				}
				const sharesOwned = (user?.portfolio as unknown as PortfolioItem[])[
					portfolioIndex
				]?.shares;
				if (sharesOwned === undefined) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						'Shares not found for the specified stock'
					);
				}

				if (sharesOwned < shares) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						`User only owns ${sharesOwned} shares`
					);
				}
				// Check that the selling price is greater than or equal to the current price
				if (price < stock!.price) {
					return Api.badRequest(
						res,
						Message.ValidationError,
						'Selling price is lower than current price'
					);
				}
				// Create the sell order
				const order = new Order({
					type,
					user: userId,
					stock: stockId as ObjectId, // cast stockId to ObjectId
					symbol: stock?.symbol,
					shares,
					price,
					status: 'open',
				});
				// Update the user's orders and portfolio
				if (user) {
					user!.orders.push(order._id as unknown as ObjectId); // cast order._id to ObjectId
					(user!.portfolio as unknown as PortfolioItem[])[
						portfolioIndex
					].shares -= shares;
					user!.walletBalance += shares * price;
					// Save the updated user and order
					await Promise.all([user?.save(), order.save()]);
				}
				Api.created(res, { order }, 'Sell order created successfully');
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
