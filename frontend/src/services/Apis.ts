import { AxiosRequest } from './ApiCall';

const baseUrl = import.meta.env.BASE_URL as string;

export const api = {
	user: {
		register: async (body: any) => {
			const { data } = await AxiosRequest(
				'POST',
				`${baseUrl}/user/register`,
				body
			);
			return data;
		},
		login: async (body: any, header: any) => {
			const { data } = await AxiosRequest(
				'POST',
				`${baseUrl}/user/login`,
				body,
				header
			);
			return data;
		},
		getAuthdetails: async () => {
			const { data } = await AxiosRequest('GET', `${baseUrl}/user`);
			return data;
		},
	},
	stocks: {
		createStock: async (body: any) => {
			const { data } = await AxiosRequest(
				'POST',
				`${baseUrl}/stock/create`,
				body
			);
			return data;
		},
		getStocks: async () => {
			const { data } = await AxiosRequest('GET', `${baseUrl}/stock`);
			return data;
		},
		getStockById: async (id: string) => {
			const { data } = await AxiosRequest('GET', `${baseUrl}/stock/${id}`);
			return data;
		},
		updateStock: async (id: string) => {
			const { data } = await AxiosRequest('PUT', `${baseUrl}/stock/${id}`);
			return data;
		},
		deleteStock: async (id: string) => {
			const { data } = await AxiosRequest('DELETE', `${baseUrl}/stock/${id}`);
			return data;
		},
	},
};
