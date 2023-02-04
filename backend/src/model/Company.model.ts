// Importing Libraries
import mongoose, { Schema } from "mongoose";

// Importing dependencies
import { Company } from "../interfaces/Company";

const companySchema = new Schema({
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

export default mongoose.model<Company>("Company", companySchema);
