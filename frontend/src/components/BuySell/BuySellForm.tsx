import React, { useState, useEffect } from 'react';

const StockExchange = () => {
	const [stocks, setStocks] = useState([]);
	const [symbol, setSymbol] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [token, setToken] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getStocks = async () => {
			setStocks();
		};
		getStocks();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// API request to be importing from redux
			setSymbol('');
			setName('');
			setPrice('');
			setError(null);
		} catch (err) {
			setError('Not authorized to access this resource');
		}
	};

	return (
		<div>
			{token ? (
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Symbol"
						value={symbol}
						onChange={(e) => setSymbol(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<button type="submit">Add Stock</button>
				</form>
			) : (
				<form onSubmit={handleLogin}>
					<button type="submit">Login</button>
				</form>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul>
				{stocks.map((stock) => (
					<li key={stock._id}>
						{stock.symbol} ({stock.name}) - ${stock.price}
					</li>
				))}
			</ul>
		</div>
	);
};
