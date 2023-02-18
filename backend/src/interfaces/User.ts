// Importing Libraries
import { Document } from 'mongoose';

export interface IUser extends Document {
	save(): any;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	email: string;
	password: string;
	walletBalance: number;
	isAdmin: boolean;
	portfolio: string[];
	orders: string[];
}
