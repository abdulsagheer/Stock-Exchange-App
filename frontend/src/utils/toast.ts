import { toast, TypeOptions } from 'react-toastify';

export const minimalToast = (message: string, type: TypeOptions) => {
	toast(message, {
		style: {
			background: 'linear-gradient(180deg, #17002C 0%, #000828 100%)',
		},
		hideProgressBar: true,
		autoClose: 2000,
		type: type,
	});
};
