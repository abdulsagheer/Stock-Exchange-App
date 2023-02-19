import React, { useState, useEffect } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import './Home.scss';

interface StockData {
	time: number;
	price: number;
}

const Home: React.FC = () => {
	const [data, setData] = useState<StockData[]>([]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			// Generate a random price between 100 and 200
			const price = Math.random() * 100 + 100;

			// Add a new data point with the current time and price
			setData((prevData) => [...prevData, { time: Date.now(), price }]);

			// Remove the oldest data point if we have more than 50
			if (data.length > 50) {
				setData((prevData) => prevData.slice(1));
			}
		}, 6000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="home">
			<h1 className="header">Stock Exchange System</h1>

			<LineChart width={1400} height={500} data={data}>
				<XAxis
					dataKey="time"
					type="number"
					domain={['dataMin', 'dataMax']}
					tickFormatter={(time) => new Date(time).toLocaleTimeString()}
				/>
				<YAxis dataKey="price" type="number" domain={['dataMin', 'dataMax']} />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip labelFormatter={(time) => new Date(time).toLocaleString()} />
				<Legend />
				<Line type="monotone" dataKey="price" stroke="#8884d8" />
			</LineChart>
		</div>
	);
};

export default Home;
