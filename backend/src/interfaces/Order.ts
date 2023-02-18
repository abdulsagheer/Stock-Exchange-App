// Importing Libraries
import { Document } from 'mongoose';

export interface IOrder extends Document {
	type: 'buy' | 'sell';
	user: string;
	stock: string;
	symbol: string;
	price?: number;
	shares: number;
	status: 'open' | 'executed';
	timestamp: Date;
}
