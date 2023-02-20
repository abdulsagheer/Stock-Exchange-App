import StockForm, { StockFormData } from '../../components/StockForm/StockForm';
import './StockUpdate.scss';

export const StockUpdate: React.FC = () => {
	const initialData: StockFormData = {
		name: 'Apple Inc.',
		symbol: 'AAPL',
		price: 140.98,
		marketCap: 2362200000000,
		percentageDiluted: 0.846,
		sharesIssued: 16651032000,
	};

	const handleFormSubmit = (data: StockFormData) => {
		// Submit the data to your server or perform some other action
		console.log('Form submitted:', data);
	};

	return (
		<>
			<h1 style={{ margin: '30px 130px' }}>Update Stock</h1>
			<div className="form">
				<StockForm onSubmit={handleFormSubmit} initialData={initialData} />
			</div>
		</>
	);
};
