import { AxiosRequest } from './ApiCall';

const baseUrl = import.meta.env.VITE_SERVER_URL as string;
console.log(import.meta.env.VITE_SERVER_URL);

export const api = {
	user: {
		register: async (body: any) => {
			const { data } = await AxiosRequest(
				'POST',
				`${baseUrl}/users/register`,
				body
			);
			return data;
		},
		login: async (body: any, header: any) => {
			const { data } = await AxiosRequest(
				'POST',
				`${baseUrl}/users/login`,
				body,
				header
			);
			return data;
		},
		getAuthdetails: async () => {
			const { data } = await AxiosRequest('GET', `${baseUrl}/users`);
			return data;
		},
	},
	stocks: {
		createStock: async (body: any) => {
			const { data } = await AxiosRequest(
				'POST',
				`${baseUrl}/stocks/create`,
				body
			);
			return data;
		},
		getStocks: async () => {
			const { data } = await AxiosRequest('GET', `${baseUrl}/stocks`);
			return data;
		},
		getStockById: async (id: string) => {
			const { data } = await AxiosRequest('GET', `${baseUrl}/stocks/${id}`);
			return data;
		},
		updateStock: async (id: string) => {
			const { data } = await AxiosRequest('PUT', `${baseUrl}/stocks/${id}`);
			return data;
		},
		deleteStock: async (id: string) => {
			const { data } = await AxiosRequest('DELETE', `${baseUrl}/stocks/${id}`);
			return data;
		},
	},
};
