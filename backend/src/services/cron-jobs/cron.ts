// Importing Libraries
import cron from 'node-cron';

// Importing dependencies
import { updateStockPrice } from '../../controllers/stock.controller';

export const initialiseCron = () => {
	/**
	 * @description update newly order stocks
	 *  interval every 15 mins
	 */
	cron.schedule('*/15 * * * *', (now) => {
		updateStockPrice;
	});

	/**
	 * @description update order stocks
	 * interval every 24 hour
	 */
	cron.schedule('0 */24 * * *', (now) => {});
};
