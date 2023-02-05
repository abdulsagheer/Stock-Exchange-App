import { loaduser } from '../redux/auth/auth';
import { store } from '../redux/store';
import axios from 'axios';
import { ILocalStorage } from '../types/auth.types';
import { raiseToast } from '../redux/toast/slice';

class AuthUtils {
	static setLocalStorage<T extends keyof ILocalStorage>(
		key: T,
		value: ILocalStorage[T]
	): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static getLocalStorage<T extends keyof ILocalStorage>(
		key: T
	): ILocalStorage[T] | null {
		const value = localStorage.getItem(key);

		if (value) {
			return JSON.parse(value);
		}

		return null;
	}

	static removeLocalStorage<T extends keyof ILocalStorage>(key: T): void {
		localStorage.removeItem(key);
	}

	static setAuthToken(): void {
		const token = this.getLocalStorage('access_token');

		if (token) {
			axios.defaults.headers.common['Authorization'] = `${token}`;
		} else {
			delete axios.defaults.headers.common['Authorization'];
		}
	}

	static async authorize(_store: typeof store): Promise<void> {
		const token = this.getLocalStorage('access_token');

		try {
			if (token) {
				_store.dispatch(loaduser());
			} else {
				return;
			}
		} catch (error: any) {
			_store.dispatch(raiseToast({ type: 'error', message: error.message }));
		}
	}
}

export default AuthUtils;
