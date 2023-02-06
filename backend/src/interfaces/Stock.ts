import { ObjectId } from 'mongoose';
export interface IStock {
	name: string;
	symbol: string;
	stock: ObjectId;
	user: ObjectId; 
	marketCap: number;
	percentageDiluted: number;
	sharesIssued: number;
}
