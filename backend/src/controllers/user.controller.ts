// Importing Libraries
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

// Importing dependencies
import User from '../model/User.Model';
import { generateToken } from '../utils/generateToken';
import { validateMongodbID } from '../utils/validateMongodbID';
import { Message } from './../utils/helper';
import Api from '../utils/helper';

/** Register User */
export const userRegister = expressAsyncHandler(
	async (req: Request, res: Response) => {
		// Check if user is already registered
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return Api.badRequest(res, ' ', Message.UserExist);
		}
		try {
			// Register user
			const { firstName, lastName, email, password } = req.body;
			const user = await User.create({ firstName, lastName, email, password });
			Api.created(res, user, Message.CreateAccount);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

/** Login User */
export const userLogin = expressAsyncHandler(
	async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;
			// Check if user is already exists
			const userFound = await User.findOne({ email });
			// Check if password is matched
			if (userFound && bcrypt.compareSync(password, userFound.password)) {
				Api.ok(
					res,
					{
						_id: userFound?._id,
						name: userFound?.name,
						email: userFound?.email,
						isAdmin: userFound?.isAdmin,
						token: generateToken(String(userFound._id)),
					},
					Message.LoginSuccess
				);
			} else {
				return Api.unauthorized(
					res,
					'Invalid Login Credentials',
					Message.NotAuthorized
				);
			}
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

/** Delete User By ID */
export const deleteUser = expressAsyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params;
		validateMongodbID(id);
		try {
			const deletedUser = await User.findByIdAndDelete(id);
			Api.ok(res, deletedUser, Message.Delete);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

/** Fetch All Users Details */
export const fetchAllUsers = expressAsyncHandler(
	async (req: Request, res: Response) => {
		console.log(req.headers);

		// Fetch all users
		try {
			const users = await User.find({});
			Api.ok(res, users, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

/** Fetch User Details By ID */
export const fetchUserDetails = expressAsyncHandler(
	async (req: Request, res: Response) => {
		// Fetch Single User Details By ID
		const { id } = req.params;
		validateMongodbID(id);
		try {
			const user = await User.findById(id);
			Api.ok(res, user, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);

/** Fetch User Profile */
export const userProfile = expressAsyncHandler(
	async (req: Request, res: Response) => {
		// User profile fetching
		const { id } = req.params;
		validateMongodbID(id);

		try {
			const profile = await User.findById(id);
			Api.ok(res, profile, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, error.message);
		}
	}
);
