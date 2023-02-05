import { NextFunction } from 'express';
// Importing Libraries
import express from 'express';

// Importing dependencies
import {
	userLogin,
	userRegister,
	fetchAllUsers,
	deleteUser,
	fetchUserDetails,
	userProfile,
} from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';
const userRoute = express.Router();

/** Get Registration Details */
userRoute.post('/register', userRegister);

/** Fetch Login Details */
userRoute.post('/login', userLogin);

/** Fetch User Profile */
userRoute.get('/profile/:id', authMiddleware, userProfile);

/** Delete all users */
userRoute.delete('/:id', deleteUser);

/** Fetch all users */
userRoute.get('/', authMiddleware, fetchAllUsers);

/** Fetch Single User Details By ID */
userRoute.get('/:id', fetchUserDetails);

/** Fetch User Profile */
userRoute.get('/profile/:id', authMiddleware, userProfile);

export default userRoute;
