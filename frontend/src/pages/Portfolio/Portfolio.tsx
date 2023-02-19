import React, { useState } from 'react';
import './Portfolio.scss';

interface PortfolioItem {
	symbol: string;
	name: string;
	quantity: number;
	investedValue: number;
}

const stocks: PortfolioItem[] = [
	{ symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, investedValue: 1000 },
	{ symbol: 'AMZN', name: 'Amazon.com Inc.', quantity: 5, investedValue: 2000 },
	{ symbol: 'GOOG', name: 'Alphabet Inc.', quantity: 7, investedValue: 1500 },
];

const Portfolio: React.FC = () => {
	const [portfolio, setPortfolio] = useState<PortfolioItem[]>(stocks);

	const getCurrentPrice = (symbol: string) => {
		// fetch current price from API
		return 1200.0;
	};

	const getInvestedValue = (quantity: number, investedValue: number) => {
		return quantity * investedValue;
	};

	const getCurrentValue = (symbol: string, quantity: number) => {
		const currentPrice = getCurrentPrice(symbol);
		return quantity * currentPrice;
	};

	const getPercentageChange = (
		symbol: string,
		quantity: number,
		investedValue: number
	) => {
		const currentValue = getCurrentValue(symbol, quantity);
		investedValue = getInvestedValue(quantity, investedValue);
		return ((currentValue - investedValue) / investedValue) * 100;
	};

	return (
		<div className="portfolio-page">
			<h1 className="header">My Portfolio</h1>

			<table>
				<thead>
					<tr>
						<th>Symbol</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Invested Value</th>
						<th>Current Value</th>
						<th>Change (%)</th>
					</tr>
				</thead>
				<tbody>
					{portfolio.map((item, index) => (
						<tr key={index}>
							<td>{item.symbol}</td>
							<td>{item.name}</td>
							<td>{item.quantity}</td>
							<td>${item.investedValue.toFixed(2)}</td>
							<td>${getCurrentValue(item.symbol, item.quantity).toFixed(2)}</td>
							<td>
								{getPercentageChange(
									item.symbol,
									item.quantity,
									item.investedValue
								).toFixed(2)}
								%
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Portfolio;
