// Importing Libraries
import mongoose, { Schema } from 'mongoose';

// Importing dependencies
import { IOrder } from '../interfaces/Order';

const orderSchema = new Schema({
	type: {
		type: String,
		required: true,
		enum: ['buy', 'sell'],
	},
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
	symbol: {
		type: String,
		required: true,
	},
	shares: {
		type: Number,
		required: true,
		min: 1,
		integer: true,
	},
	price: { type: Number, required: true },
	status: {
		type: String,
		required: true,
		enum: ['open', 'executed'],
	},
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', orderSchema);
