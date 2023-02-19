import React, { useState } from 'react';
import './StockCard.scss';

interface Props {
	symbol: string;
	name: string;
	price: number;
	onBuy: (quantity: number) => void;
	onSell: (quantity: number, price: number) => void;
}

const StockCard: React.FC<Props> = ({ symbol, name, price, onBuy, onSell }) => {
	const [action, setAction] = useState<'buy' | 'sell'>('buy');
	const [quantity, setQuantity] = useState<number>(0);
	const [sellPrice, setSellPrice] = useState<number>(price);

	const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setAction(event.target.value as 'buy' | 'sell');
	};

	const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(parseInt(event.target.value));
	};

	const handleSellPriceChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSellPrice(parseFloat(event.target.value));
	};

	const handleBuy = () => {
		if (quantity > 0) {
			onBuy(quantity);
			setQuantity(0);
		}
	};

	const handleSell = () => {
		if (quantity > 0 && sellPrice > 0) {
			onSell(quantity, sellPrice);
			setQuantity(0);
			setSellPrice(price);
		}
	};

	return (
		<div className="stock-card">
			<div className="stock-info">
				<div className="symbol">{symbol}</div>
				<div className="name">{name}</div>
				<div className="price">${price}</div>
			</div>
			<div className="divider"></div>
			<div className="stock-action">
				<div className="action">
					<select value={action} onChange={handleActionChange}>
						<option value="buy">Buy</option>
						<option value="sell">Sell</option>
					</select>
				</div>
				<div className="quantity">
					<input
						type="number"
						value={quantity}
						onChange={handleQuantityChange}
						placeholder="Quantity"
					/>
				</div>
				{action === 'sell' && (
					<div className="sell-price">
						<input
							type="number"
							value={sellPrice}
							onChange={handleSellPriceChange}
							placeholder="Price"
						/>
					</div>
				)}
				<div className="submit">
					<button onClick={action === 'buy' ? handleBuy : handleSell}>
						{action}
					</button>
				</div>
			</div>
		</div>
	);
};

export default StockCard;
