import { Document } from 'mongoose';

export interface IStock extends Document {
	name: string;
	symbol: string;
	price: number;
	marketCap: number;
	percentageDiluted: number;
	sharesIssued: number;
}
