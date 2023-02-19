import { changeLoadingState } from '../loading/slice';
import { raiseToast } from '../toast/slice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthResponse, IAuthState } from '../../types/auth.types';
import { api } from '../../services/Apis';
import AuthUtils from '../../utils/auth.utils';
import { RootState } from '../store';

export type ISigninDetails = {
	email: string;
	password: string;
};

export type ISignupDetails = {
	email: string;
	name: string;
	password: string;
};

export const SERVER_URI = import.meta.env.VITE_SERVER_URL;

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
			const data = await api.user.getAuthdetails();
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
const login = createAsyncThunk(
	'auth/login',
	async (details: ISigninDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.user.login(details, {
				'Access-Control-Allow-Origin': 'http://localhost:5173/',
			});

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

/**
 * @description - To register a new user
 */
const register = createAsyncThunk(
	'auth/login',
	async (details: ISignupDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));
			const data = await api.user.register(details);

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
		},

		/**
		 * Update profile success
		 */
		updateProfileSuccess(
			state,
			{
				payload,
			}: { payload: { name?: string; email?: string; password?: string } }
		) {
			if (state.user) {
				Object.assign(state.user, payload);
			}
		},

		updateAuthState: (state, { payload }: { payload: Partial<IAuthState> }) => {
			Object.assign(state, payload);
		},
	},
});

const { error, logout, success, updateProfileSuccess, updateAuthState } =
	authSlice.actions;

export function getAuthState(state: RootState): IAuthState {
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
};

export const authReducer = authSlice.reducer;
