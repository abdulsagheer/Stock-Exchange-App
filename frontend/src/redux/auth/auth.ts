import { changeLoadingState } from '../loading/slice';
import { raiseToast } from '../toast/slice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthResponse, IAuthState } from '../../types/auth.types';
import { api } from 'utils/api';
import AuthUtils from '../../utils/auth.utils';

export type ISignupDetails = {
	email: string;
	username: string;
	name: string;
};

export const SERVER_URI = process.env.SERVER_URL;

const initialState: IAuthState = {
	access_token: AuthUtils.getLocalStorage('access_token'),
	user: null,
	isAuthenticated: false,
	adminMode: false,
};

/**
 * @description - To load user using token in local storage on page refresh or fresh page visit
 */
const loaduser = createAsyncThunk(
	'auth/loaduser',
	async (_: void, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));
			const data = await api.authorization.user.getAuthdetails();
			if (!data || !data?.accessToken) {
				throw new Error('Something went wrong. Please try again later.');
			}

			dispatch(success(data));

			dispatch(changeLoadingState(false));
		} catch (err: any) {
			const message = err?.response ? err.response.data.message : err.message;

			dispatch(changeLoadingState(false));
			dispatch(error());

			dispatch(
				raiseToast({
					type: 'error',
					message,
				})
			);
		}
	}
);

/**
 * @description - To login user
 */
const login = createAsyncThunk('auth/login', async (_: void, { dispatch }) => {
	try {
		dispatch(changeLoadingState(true));

		const data = await api.authorization.user.authLogin();

		if (!data || !data?.accessToken) {
			throw new Error('Something went wrong. Please try again later.');
		}

		dispatch(success(data));

		dispatch(changeLoadingState(false));
	} catch (err: any) {
		const message = err?.response ? err.response.data.message : err.message;

		dispatch(changeLoadingState(false));

		dispatch(
			raiseToast({
				type: 'error',
				message,
			})
		);
	}
});

/**
 * @description - To register a new user
 */
const register = createAsyncThunk(
	'auth/login',
	async (details: ISignupDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));
			const data = await api.authorization.user.authRegister(details);

			if (!data || !data?.accessToken) {
				throw new Error('Something went wrong. Please try again later.');
			}

			dispatch(success(data));

			dispatch(changeLoadingState(false));
		} catch (err: any) {
			const message = err?.response ? err.response.data.message : err.message;

			dispatch(changeLoadingState(false));

			dispatch(
				raiseToast({
					type: 'error',
					message,
				})
			);
		}
	}
);

const updateUserDetails = createAsyncThunk(
	'auth/updateUserDetails',
	async (
		details: {
			name?: string;
			username?: string;
			email?: string;
			walletAddress: string;
		},
		{ dispatch }
	) => {
		try {
			dispatch(changeLoadingState(true));

			const _signed = await generateSignature(details.walletAddress);

			if (_signed) {
				await api.authorization.user.updateProfiledetails(details);
				dispatch(
					updateProfileSuccess({
						...details,
					})
				);
			} else {
				throw new Error('Signature generation failed');
			}
		} catch (err: any) {
			console.log(err);
			const message = err?.response ? err.response.data.message : err.message;

			dispatch(
				raiseToast({
					type: 'error',
					message,
				})
			);
		}
		dispatch(changeLoadingState(false));
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		/**
		 * Logout user
		 */
		logout: (state) => {
			AuthUtils.removeLocalStorage('access_token');
			AuthUtils.setAuthToken();

			Object.assign(state, initialState, { access_token: null });
		},

		/**
		 * Handle Auth Error
		 */
		error: (state) => {
			AuthUtils.removeLocalStorage('access_token');
			AuthUtils.setAuthToken();

			Object.assign(state, initialState, { access_token: null });
		},

		/**
		 * Handle Auth Request Success
		 */
		success: (state, { payload }: { payload: IAuthResponse }) => {
			AuthUtils.setLocalStorage('access_token', payload.accessToken);
			AuthUtils.setAuthToken();

			state.access_token = payload.accessToken;
			state.isAuthenticated = true;
			state.user = payload.user;
			state.walletBalance = payload.walletBalance;
		},

		/**
		 * Update profile success
		 */
		updateProfileSuccess(
			state,
			{
				payload,
			}: { payload: { name?: string; email?: string; username?: string } }
		) {
			if (state.user) {
				Object.assign(state.user, payload);
			}
		},

		updateWalletBalance: (
			state,
			{ payload }: { payload: Partial<IAuthState['walletBalance']> }
		) => {
			state.walletBalance = {
				...state.walletBalance,
				...payload,
			};
		},

		updateAuthState: (state, { payload }: { payload: Partial<IAuthState> }) => {
			Object.assign(state, payload);
		},
	},
});

const { error, logout, success, updateProfileSuccess, updateAuthState } =
	authSlice.actions;

export function getAuthState(state: IGlobalState): IAuthState {
	return state.auth;
}

export {
	error,
	loaduser,
	login,
	logout,
	register,
	success,
	updateAuthState,
	updateProfileSuccess,
	updateUserDetails,
};

export const authReducer = authSlice.reducer;
