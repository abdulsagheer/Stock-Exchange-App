import { changeLoadingState } from '../loading/slice';
import { raiseToast } from '../toast/slice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthResponse, IAuthState } from '../../types/auth.types';
import { api } from '../../services/Apis';
import AuthUtils from '../../utils/auth.utils';
import { RootState } from '../store';

export type IStockDetails = {
	name: string;
	symbol: string;
	marketCap: number;
	percentageDiluted: number;
	sharesIssued: number;
};

export const SERVER_URI = process.env.SERVER_URL;

/**
 * @description - To create stock
 */
const createStock = createAsyncThunk(
	'stock/create',
	async (details: IStockDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.createStock();
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
 * @description - To get all stocks
 */
const getStocks = createAsyncThunk(
	'stock/allstocks',
	async (details: IStockDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.getStocks();

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
 * @description - To get stock by id
 */
const getStockById = createAsyncThunk(
	'stock/stockById',
	async (details: IStockDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.getStockById();

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
 * @description - To update  stocks
 */
const updateStock = createAsyncThunk(
	'stock/updateStock',
	async (details: IStockDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.updateStock();

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
 * @description - To delete stocks
 */
const deleteStock = createAsyncThunk(
	'stock/deleteStock',
	async (details: IStockDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.deleteStock();

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

const stockSlice = createSlice({
	name: 'stock',
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
	stockSlice.actions;

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

export const stockReducer = stockSlice.reducer;
