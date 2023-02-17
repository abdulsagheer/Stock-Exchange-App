// Importing Libraries
import { ObjectId } from 'mongoose';

export interface IOrder {
	type: 'buy' | 'sell';
	user: ObjectId;
	stock: ObjectId;
	symbol: string;
	shares: number;
	price?: number;
	status: 'open' | 'executed';
	timestamp: Date;
}
