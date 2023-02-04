export interface Order {
	type: "buy" | "sell";
	symbol: string;
	shares: number;
	priceThreshold?: number;
	status: "open" | "executed";
}
