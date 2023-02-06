import { authReducer } from './auth/auth';
import { loadingReducer } from './loading/slice';
import { toastReducer } from './toast/slice';
import { stockReducer } from './stock/slice';

export const rootReducer = {
	auth: authReducer,
	loading: loadingReducer,
	toast: toastReducer,
	stock: stockReducer,
};
