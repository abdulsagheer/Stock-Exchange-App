import React from 'react';
import './Order.scss';

const orders = [
	{
		id: 1,
		symbol: 'AAPL',
		name: 'Apple',
		type: 'buy',
		quantity: 2,
		price: 100,
	},
	{
		id: 2,
		symbol: 'AMAZ',
		name: 'Amazon',
		type: 'sell',
		quantity: 12,
		price: 25400,
	},
	{
		id: 3,
		symbol: 'ORCL',
		name: 'Oracle',
		type: 'buy',
		quantity: 5,
		price: 53500,
	},
	{
		id: 4,
		symbol: 'SAMSG',
		name: 'Samsung',
		type: 'sell',
		quantity: 4,
		price: 5500,
	},
	{
		id: 5,
		symbol: 'ACCNT',
		name: 'Accenture',
		type: 'buy',
		quantity: 41,
		price: 5365100,
	},
	{
		id: 6,
		symbol: 'MIC',
		name: 'Microsoft',
		type: 'sell',
		quantity: 20,
		price: 25300,
	},
];

const Order: React.FC = () => {
	return (
		<div className="orders-page">
			<h1 className="header">My Orders</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Symbol</th>
						<th>Name</th>
						<th>Type</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id}>
							<td>{order.id}</td>
							<td>{order.symbol}</td>
							<td>{order.name}</td>
							<td>{order.type}</td>
							<td>{order.quantity}</td>
							<td>${order.price.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Order;
