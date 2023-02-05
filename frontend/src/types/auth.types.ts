export type IAuthState = {
	access_token: string | undefined | null;
	user: IApiUser | undefined | null;
	isAuthenticated: boolean;
	adminMode: boolean;
};

export type ISignupDetails = {
	email: string;
	password: string;
	name: string;
};

export type IApiUser = {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
};

export type IAuthResponse = {
	accessToken: string;
	user: IApiUser;
};

export type ILocalStorage = {
	access_token: string;
};
