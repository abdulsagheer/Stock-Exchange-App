// Importing Libraries
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';

// Importing Dependencies
import User from '../models/User.Model';
import { JwtPayload } from '../interfaces/Jwt';
import Api from '../utils/helper';

// Function for Authenticating Middleware on routes so that logged in user can access routes.
export const authMiddleware = expressAsyncHandler(
	async (req: any, res: any, next: NextFunction) => {
		let token: string | null;
		if (req?.headers?.authorization?.startsWith('Bearer')) {
			try {
				// It split a token into two i.e, Bearer random token and takes the token
				token = req.headers.authorization.split(' ')[1];
				if (token) {
					const decoded = jwt.verify(
						token,
						String(process.env.JWT_KEY)
					) as JwtPayload;
					// find the user by ID
					const user = await User.findById(decoded?.id).select('-password');
					// attach the user to the request object
					req.user = user;
					next();
				} else {
					return Api.unauthorized(
						req,
						res,
						'There is no token attached to the header'
					);
				}
			} catch (error) {
				return Api.unauthorized(
					req,
					res,
					'There is no token attached to the header'
				);
			}
		} else {
			return Api.unauthorized(
				req,
				res,
				'There is no token attached to the header'
			);
		}
	}
);
