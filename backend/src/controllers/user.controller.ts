// Importing Libraries
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

// Importing dependencies
import User from '../models/User.Model';
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
			const { name, email, password, role } = req.body;
			const hashedPassword = bcrypt.hashSync(password);
			const user = new User({
				name,
				email,
				password: hashedPassword,
				role,
			});
			await user.save();
			Api.created(res, user, Message.CreateAccount);
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
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
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

/** Delete User By ID */
export const deleteUser = expressAsyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params;
		validateMongodbID(req, res, id);

		try {
			const deletedUser = await User.findByIdAndDelete(id);
			Api.ok(res, deletedUser, Message.Delete);
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

/** Fetch All Users Details */
export const fetchAllUsers = expressAsyncHandler(
	async (req: Request, res: Response) => {
		// Fetch all users
		try {
			const users = await User.find({});
			Api.ok(res, users, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

/** Fetch User Details By ID */
export const fetchUserDetails = expressAsyncHandler(
	async (req: Request, res: Response) => {
		// Fetch Single User Details By ID
		const { id } = req.params;
		validateMongodbID(req, res, id);

		try {
			const user = await User.findById(id)
				.populate('portfolio')
				.populate('name');
			Api.ok(res, user, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

/** Fetch User Profile */
export const userProfile = expressAsyncHandler(
	async (req: Request, res: Response) => {
		// User profile fetching
		const { id } = req.params;
		validateMongodbID(req, res, id);

		try {
			const profile = await User.findById(id)
				.populate('portfolio')
				.populate('name');
			Api.ok(res, profile, Message.Fetched);
		} catch (error: any) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);
