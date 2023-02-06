import React, { useState, useEffect } from 'react';

const StockInfo = ({ symbol }: { symbol: any }) => {
	const [stockData, setStockData] = useState({});
	useEffect(() => {}, []);

	return (
		<div>
			<h1>{stockData?.name}</h1>
			<p>Price: ${stockData?.price}</p>
			<p>Volume: {stockData?.volume}</p>
			<img src={stockData?.chart} alt="Stock chart" />
		</div>
	);
};

export default StockInfo;
