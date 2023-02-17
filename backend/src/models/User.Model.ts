// Importing Libraries
import mongoose, { Schema } from 'mongoose';

// Importing dependencies
import { IUser } from '../interfaces/User';

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		walletBalance: { type: Number, default: 50000000 },
		isAdmin: { type: Boolean, default: false, required: true },
		portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
		orders: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
		],
	},
	{
		timestamps: true,
	}
);
export default mongoose.model<IUser>('User', userSchema);
