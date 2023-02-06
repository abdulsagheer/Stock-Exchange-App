import { ObjectId } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	password: string;
	walletBalance: number;
	portfolio: [ObjectId];
	role: 'Admin' | 'Trader';
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
