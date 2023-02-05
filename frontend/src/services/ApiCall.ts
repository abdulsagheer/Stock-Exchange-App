import axios from 'axios';

export const AxiosRequest = async (
	methods?: any,
	url?: any,
	body?: any,
	header?: any
) => {
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
