import axios from 'axios';
import { Axios } from '../interfaces/Axios.interface';

export const AxiosRequest = async ({ methods, url, body, header }: Axios) => {
	const config = {
		method: methods,
		url,
		headers: header
			? header
			: {
					'Content-Type': 'application/json',
			  },
		data: body,
	};

	// Axios instance
	return axios(config)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return error;
		});
};
