export interface IUser {
	name: string;
	email: string;
	password: string;
	walletBalance: number;
	role: 'Admin' | 'Trader';
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
