// Importing Libraries
import mongoose, { ConnectOptions } from 'mongoose';

// Importing dependencies
import Logging from '../utils/logging';
import { config } from './config';

/**  Function to connect to MongoDB */
const dbConnect = async () => {
	try {
		mongoose.set('strictQuery', true);
		(await mongoose.connect(
			config.mongo.url,
			config.mongo.options
		)) as ConnectOptions;
		Logging.info('Successfully Connected to mongoose ✅');
	} catch (error: any) {
		Logging.error(`❌ Error: ${error.message}`);
	}
};

export default dbConnect;
