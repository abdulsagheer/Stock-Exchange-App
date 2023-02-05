// Importing Libraries
import mongoose, { Schema } from 'mongoose';

// Importing dependencies
import { IStock } from '../interfaces/Stock';

const stockSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	symbol: {
		type: String,
		required: true,
		maxlength: 5,
	},
	marketCap: {
		type: Number,
		required: true,
	},
	percentageDiluted: {
		type: Number,
		required: true,
	},
	sharesIssued: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<IStock>('Stock', stockSchema);
