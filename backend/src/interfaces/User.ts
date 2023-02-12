import { ObjectId } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	password: string;
	walletBalance: number;
	isAdmin: boolean;
	role: 'Admin' | 'Trader';
	portfolio: [ObjectId];
	orders: [ObjectId];
	createdAt: Date;
	updatedAt: Date;
}
