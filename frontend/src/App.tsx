// Importing Libraries
import { Route, Routes } from 'react-router-dom';

// Importing Dependencies
import './styles/App.scss';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/login" element={<SignIn />} />
		</Routes>
	);
}

export default App;
