import React, { useState } from 'react';
import './StockForm.scss';

export interface StockFormData {
	name: string;
	symbol: string;
	price: number;
	marketCap: number;
	percentageDiluted: number;
	sharesIssued: number;
}

export interface StockFormProps {
	onSubmit: (data: StockFormData) => void;
	initialData?: StockFormData;
}

const StockForm: React.FC<StockFormProps> = ({ onSubmit, initialData }) => {
	const [formData, setFormData] = useState<StockFormData>(
		initialData || {
			name: '',
			symbol: '',
			price: 0,
			marketCap: 0,
			percentageDiluted: 0,
			sharesIssued: 0,
		}
	);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formData);
	};

	return (
		<form className="StockForm" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="symbol">Symbol</label>
				<input
					type="text"
					name="symbol"
					value={formData.symbol}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="price">Price</label>
				<input
					type="number"
					name="price"
					value={formData.price}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="marketCap">Market Cap</label>
				<input
					type="number"
					name="marketCap"
					value={formData.marketCap}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="percentageDiluted">% Diluted</label>
				<input
					type="number"
					name="percentageDiluted"
					value={formData.percentageDiluted}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="sharesIssued">Shares Issued</label>
				<input
					type="number"
					name="sharesIssued"
					value={formData.sharesIssued}
					onChange={handleInputChange}
					required
				/>
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default StockForm;
