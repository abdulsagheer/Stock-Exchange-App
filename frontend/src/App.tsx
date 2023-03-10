// Importing Libraries
import { Route, Routes } from 'react-router-dom';

// Importing Dependencies
import './styles/App.scss';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Sidebar from './components/Sidebar/Sidebar';
import Marketplace from './pages/Marketplace/Marketplace';
import Order from './pages/Order/Order';
import Stock from './pages/Stock/Stock';
import Portfolio from './pages/Portfolio/Portfolio';
import { StockCreate } from './pages/StockCreate/StockCreate';
import { StockUpdate } from './pages/StockUpdate/StockUpdate';

const links = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'Market',
		path: '/marketplace',
	},
	{
		title: 'Stock',
		path: '/stock',
	},
	{
		title: 'Orders',
		path: '/orders',
	},
	{
		title: 'Portfolio',
		path: '/portfolio',
	},
	{
		title: 'Sign Up',
		path: '/signup',
	},
	{
		title: 'Login',
		path: '/login',
	},
	{
		title: 'Stock Create',
		path: '/stockcreate',
	},
	{
		title: 'Stock Update',
		path: '/stockupdate',
	},
];

function App() {
	return (
		<div>
			<Sidebar links={links} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<SignIn />} />
				<Route path="/stock" element={<Stock />} />
				<Route path="/marketplace" element={<Marketplace />} />
				<Route path="/orders" element={<Order />} />
				<Route path="/portfolio" element={<Portfolio />} />
				<Route path="/stockcreate" element={<StockCreate />} />
				<Route path="/stockupdate" element={<StockUpdate />} />
			</Routes>
		</div>
	);
}

export default App;
