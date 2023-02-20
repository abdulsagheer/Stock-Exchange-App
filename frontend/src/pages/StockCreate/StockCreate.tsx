import React from 'react';
import StockForm, { StockFormData } from '../../components/StockForm/StockForm';
import './StockCreate.scss';

export const StockCreate: React.FC = () => {
	const handleFormSubmit = (data: StockFormData) => {
		// Submit the data to your server or perform some other action
		console.log('Form submitted:', data);
	};

	return (
		<>
			<h1 style={{ margin: "30px 130px" }}>Create Stock</h1>
			<div className="form">
				<StockForm onSubmit={handleFormSubmit} />
			</div>
		</>
	);
};
