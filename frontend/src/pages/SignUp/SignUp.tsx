import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { register } from '../../redux/auth/auth';
import { changeLoadingState } from '../../redux/loading/slice';
import { raiseToast } from '../../redux/toast/slice';
import './SignUp.scss';

const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		try {
			dispatch(changeLoadingState(true));
			dispatch(register(state));
			dispatch(changeLoadingState(false));
			navigate('/login');
		} catch (error: any) {
			dispatch(
				raiseToast({
					type: 'error',
					message: error.message,
				})
			);
		}
		console.log('Submitted!', state);
	};

	return (
		<div className="signup">
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						name="name"
						value={state.name}
						onChange={handleChange}
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						name="email"
						value={state.email}
						onChange={handleChange}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={state.password}
						onChange={handleChange}
					/>
				</label>
				<p>
					Account exists? <Link to="/login">Login</Link>
				</p>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
