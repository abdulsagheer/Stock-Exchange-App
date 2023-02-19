import { useState, useEffect } from 'react';
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

function Home() {
	const [data, setData] = useState([
		{ name: '10:00', price: 50 },
		{ name: '10:05', price: 55 },
		{ name: '10:10', price: 60 },
		{ name: '10:15', price: 65 },
		{ name: '10:20', price: 70 },
	]);

	useEffect(() => {
		const interval = setInterval(() => {
			setData((prevState) => [
				...prevState.slice(-5),
				{ name: new Date().toLocaleTimeString(), price: Math.random() * 100 },
			]);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="home">
			<h1 className="header">Stock Exchange System</h1>
			<LineChart
				width={1000}
				height={500}
				data={data}
				margin={{ top: 5, right: 50, left: 20, bottom: 5 }}
			>
				<XAxis dataKey="name" />
				<YAxis />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="price"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</div>
	);
}

export default Home;
