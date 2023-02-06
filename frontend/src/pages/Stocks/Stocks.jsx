import React, { useState } from 'react';

const StockExchange = () => {
    const [companies, setCompanies] = useState([
        {
            name: 'Stratton Oakmont Pvt. Ltd.',
            symbol: 'SOPL',
            marketCap: 100,
            percentageDiluted: 10,
            sharesIssued: 10
        },
        {
            name: 'Acme Corp',
            symbol: 'ACME',
            marketCap: 200,
            percentageDiluted: 20,
            sharesIssued: 20
        }
    ]);
    const [balance, setBalance] = useState(500000);
    const [portfolio, setPortfolio] = useState([]);
    const [orders, setOrders] = useState([]);

    const handleBuy = (company) => {
        let shares = parseInt(prompt('Enter the number of shares: '));
        if (shares * company.marketCap > balance) {
            alert('Insufficient balance');
            return;
        }
        setBalance(balance - shares * company.marketCap);
        setPortfolio([...portfolio, { ...company, shares }]);
        setOrders([...orders, { ...company, shares, type: 'buy' }]);
    };

    const handleSell = (portfolioItem) => {
        let shares = parseInt(prompt('Enter the number of shares: '));
        let price = parseInt(prompt('Enter the selling price: '));
        if (shares > portfolioItem.shares) {
            alert('You do not have enough shares to sell');
            return;
        }
        setBalance(balance + shares * price);
        setPortfolio(
            portfolio.map((item) => {
                if (item.symbol === portfolioItem.symbol) {
                    return { ...item, shares: item.shares - shares };
                }
                return item;
            })
        );
        setOrders([...orders, { ...portfolioItem, shares, type: 'sell' }]);
    };

    return (
        <div>
            <h2>Stock Exchange</h2>
            <h3>Wallet balance: {balance}</h3>
            <h3>Market</h3>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Symbol</th>
                        <th>Market Cap</th>
                        <th>Shares Issued</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.symbol}>
                            <td>{company.name}</td>
                            <td>{company.symbol}</td>
                            <td>{company.marketCap}</td>
                            <td>{company.sharesIssued}</td>
                            <td>
                                <button onClick={() => handleBuy(company)}>Buy</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}