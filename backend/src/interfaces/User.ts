export interface IUser {
	name: string;
	email: string;
	password: string;
	role: 'Admin' | 'Trader';
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
