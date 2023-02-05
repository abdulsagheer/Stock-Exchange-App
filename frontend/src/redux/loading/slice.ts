import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';

type ILoadingState = {
	isLoading: boolean;
};

const initialState: ILoadingState = {
	isLoading: false,
};

const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		changeLoadingState: (state, { payload }: { payload: boolean }) => {
			state.isLoading = payload;
		},
	},
});

const { changeLoadingState } = loadingSlice.actions;

export function getLoadingState(state: RootState): ILoadingState {
	return state.loading;
}

export { changeLoadingState };

export const loadingReducer = loadingSlice.reducer;
