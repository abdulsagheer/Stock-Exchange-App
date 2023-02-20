import { changeLoadingState } from '../loading/slice';
import { raiseToast } from '../toast/slice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/Apis';
import { success } from '../auth/auth';

export type IStockDetails = {
	name: string | undefined;
	symbol: string | undefined;
	marketCap: number | undefined;
	percentageDiluted: number | undefined;
	sharesIssued: number | undefined;
};

const initialState: IStockDetails = {
	name: undefined,
	symbol: undefined,
	marketCap: undefined,
	percentageDiluted: undefined,
	sharesIssued: undefined,
};

export const SERVER_URI = import.meta.env.VITE_SERVER_URL;

/**
 * @description - To create stock
 */
const createStock = createAsyncThunk(
	'stock/create',
	async (details: IStockDetails, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.createStock(details);
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
	async (id: any, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.getStockById(id);

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
	async (id: any, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.updateStock(id);

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
	async (id: any, { dispatch }) => {
		try {
			dispatch(changeLoadingState(true));

			const data = await api.stocks.deleteStock(id);

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
	reducers: {},
});

const {} = stockSlice.actions;

export {};

export const stockReducer = stockSlice.reducer;
