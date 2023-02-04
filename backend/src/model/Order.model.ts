// Importing Libraries
import mongoose, { Schema } from "mongoose";

// Importing dependencies
import { Order } from "../interfaces/Order";

const orderSchema = new Schema({
	type: {
		type: String,
		required: true,
		enum: ["buy", "sell"],
	},
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
	priceThreshold: {
		type: Number,
		required: false,
	},
	status: {
		type: String,
		required: true,
		enum: ["open", "executed"],
	},
});

export default mongoose.model<Order>("Order", orderSchema);
