import React, { useState, useEffect } from 'react';

const AvailableShares = () => {
	useEffect(() => {}, []);

	return (
		<div>
			<h1>Available Shares</h1>
			<table>
				<thead>
					<tr>
						<th>Company Name</th>
						<th>Share Price</th>
						<th>Number of Shares</th>
						<th>Buy</th>
					</tr>
				</thead>
				<tbody>
					{shares.map((share) => (
						<tr key={share._id}>
							<td>{share.companyName}</td>
							<td>{share.sharePrice}</td>
							<td>{share.numberOfShares}</td>
							<td>
								<button>Buy</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AvailableShares;
