// Importing Libraries
import { ObjectId } from 'mongoose';

export interface IUser {
	save(): any;
	name: string;
	email: string;
	password: string;
	walletBalance: number;
	isAdmin: boolean;
	portfolio: ObjectId[];
	orders: ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}
