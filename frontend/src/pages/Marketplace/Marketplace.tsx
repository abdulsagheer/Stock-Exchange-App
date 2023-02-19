import React from 'react';
import './Marketplace.scss';

interface StockData {
	name: string;
	price: number;
}

const stocks: StockData[] = [
	{ name: 'AAPL', price: 145.86 },
	{ name: 'GOOG', price: 2673.83 },
	{ name: 'TSLA', price: 781.3 },
	{ name: 'AMZN', price: 3222.9 },
	{ name: 'NFLX', price: 514.69 },
];

const Marketplace: React.FC = () => {
	return (
		<div className="market-page">
			<h1 className="header">Market Page</h1>
			<table>
				<thead>
					<tr>
						<th>Stock</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{stocks.map((stock) => (
						<tr key={stock.name}>
							<td>{stock.name}</td>
							<td>{stock.price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Marketplace;
