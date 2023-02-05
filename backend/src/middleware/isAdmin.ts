// Importing Libraries
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';

// Importing Dependencies
import User from '../model/User.Model';
import Api, { Message } from '../utils/helper';
import { JwtPayload } from '../interfaces/Jwt';

export const isAdmin = expressAsyncHandler(
	async (req: any, res: any, next: NextFunction) => {
		let token: any;
		try {
			token = req.headers.authorization?.split(' ')[1];
			if (!token) {
				return Api.unauthorized(req, res, Message.AccessDenied);
			}
			const decoded = jwt.verify(
				token,
				String(process.env.JWT_KEY)
			) as JwtPayload;
			// find the user by ID
			const user = await User.findById(decoded?.id).select('-password');
			req.user = decoded as JwtPayload;
			if (req.user.role !== 'admin') {
				return Api.unauthorized(req, res, Message.NotAuthorized);
			}
			next();
		} catch (error: any) {
			Api.serverError(req, res, error, Message.ServerError);
		}
	}
);
