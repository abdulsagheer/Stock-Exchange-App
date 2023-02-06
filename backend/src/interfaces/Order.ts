import { ObjectId } from 'mongoose';
export interface IOrder {
	type: 'buy' | 'sell';
	user: string;
	symbol: string;
	shares: number;
	priceThreshold?: number;
	portfolio?: [ObjectId];
	status: 'open' | 'executed';
}
