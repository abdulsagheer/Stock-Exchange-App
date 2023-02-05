export interface IOrder {
	type: 'buy' | 'sell';
	symbol: string;
	shares: number;
	priceThreshold?: number;
	status: 'open' | 'executed';
}
