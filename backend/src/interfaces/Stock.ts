import { ObjectId } from 'mongoose';
export interface IStock {
	name: string;
	symbol: string;
	user: ObjectId;
	marketCap: number;
	price: number;
	percentageDiluted: number;
	sharesIssued: number;
}
