import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';

type IToastState = {
	type: 'error' | 'success' | 'warning' | 'info' | undefined;
	message: string | string[] | null | undefined;
	isVisible: boolean;
	closable: boolean;
};

const initialState: IToastState = {
	type: undefined,
	message: null,
	isVisible: false,
	closable: true,
};

type IRaiseToastPayload = {
	type: Exclude<IToastState['type'], undefined>;
	message: Exclude<IToastState['message'], null | undefined>;
	closable?: boolean;
};

const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		raiseToast(state, { payload }: { payload: IRaiseToastPayload }) {
			state.isVisible = true;
			state.message = payload.message;
			state.type = payload.type;
			state.closable = payload.closable ?? true;
		},
		clearToast(state) {
			state.type = initialState.type;
			state.message = initialState.message;
			state.isVisible = initialState.isVisible;
			state.closable = initialState.closable;
		},
	},
});

const { raiseToast, clearToast } = toastSlice.actions;

export function getToastState(state: RootState): IToastState {
	return state.toast;
}

export { clearToast, raiseToast };
export const toastReducer = toastSlice.reducer;
