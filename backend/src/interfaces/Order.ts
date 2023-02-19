// Importing Libraries
import { Document, ObjectId } from 'mongoose';

export interface IOrder extends Document {
	type: 'buy' | 'sell';
	user: ObjectId;
	stock: ObjectId;
	symbol: string;
	price?: number;
	shares: number;
	status: 'open' | 'executed';
	timestamp: Date;
}
