import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { FaWallet } from 'react-icons/fa';

interface Props {
	links: { path: string; title: string }[];
}

const Sidebar: React.FC<Props> = ({ links }) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
			<button className="toggle-btn" onClick={toggleSidebar}>
				{isOpen ? 'Close' : 'Open'}
			</button>
			<ul className="links">
				{/* <li>
					<Link></Link>
				</li> */}
				{links.map((link) => (
					<li key={link.path}>
						<Link to={link.path}>{link.title}</Link>
					</li>
				))}
			</ul>
			<p>
				<FaWallet />: $500000
			</p>
		</div>
	);
};

export default Sidebar;
