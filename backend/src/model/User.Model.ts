// Importing Libraries
import mongoose, { Schema } from 'mongoose';

// Importing dependencies
import { IUser } from '../interfaces/User';

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false, required: true },
		role: { type: String, enum: ['Admin', 'Trader'] },
	},
	{
		timestamps: true,
	}
);
export default mongoose.model<IUser>('User', userSchema);
