import cron from 'node-cron';

export const initiliseCron = () => {
	/**
	 * @description update newly order stocks
	 *  interval every 12 hours
	 */
	cron.schedule('0 */12 * * *', (now) => {});

	/**
	 * @description update order stocks
	 * interval every 24 hour
	 */
	cron.schedule('0 */24 * * *', (now) => {});
};
