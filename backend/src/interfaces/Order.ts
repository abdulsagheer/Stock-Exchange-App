export interface IOrder {
	type: 'buy' | 'sell';
	user: string;
	symbol: string;
	shares: number;
	priceThreshold?: number;
	status: 'open' | 'executed';
}
