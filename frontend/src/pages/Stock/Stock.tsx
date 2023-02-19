import React, { useState } from 'react';
import StockCard from '../../components/StockCard/StockCard';
import './Stock.scss';

interface IStock {
	symbol: string;
	name: string;
	price: number;
}

const STOCKS: IStock[] = [
	{ symbol: 'AAPL', name: 'Apple Inc.', price: 135.39 },
	{ symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2134.87 },
	{ symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3180.74 },
	{ symbol: 'MSFT', name: 'Microsoft Corporation', price: 241.51 },
];

const Stock: React.FC = () => {
	const [stocks, setStocks] = useState<IStock[]>(STOCKS);

	const handleBuy = (symbol: string, quantity: number) => {
		const updatedStocks = stocks.map((stock) =>
			stock.symbol === symbol
				? { ...stock, price: stock.price + 10 * quantity }
				: stock
		);
		setStocks(updatedStocks);
	};

	const handleSell = (symbol: string, price: number, quantity: number) => {
		const updatedStocks = stocks.map((stock) =>
			stock.symbol === symbol
				? { ...stock, price: stock.price - price * quantity }
				: stock
		);
		setStocks(updatedStocks);
	};

	return (
		<div className="stock-page">
			<div className="stock-page__header">
				<h1>Stocks</h1>
			</div>
			<div className="stock-page__body">
				{stocks.map((stock) => (
					<StockCard
						key={stock.symbol}
						symbol={stock.symbol}
						name={stock.name}
						price={stock.price}
						onBuy={(quantity: number) => handleBuy(stock.symbol, quantity)}
						onSell={(price: number, quantity: number) =>
							handleSell(stock.symbol, price, quantity)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default Stock;
