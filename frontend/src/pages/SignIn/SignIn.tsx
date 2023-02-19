import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { login } from '../../redux/auth/auth';
import { changeLoadingState } from '../../redux/loading/slice';
import { raiseToast } from '../../redux/toast/slice';
import './SignIn.scss';

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [state, setState] = useState({
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
			dispatch(login(state));
			dispatch(changeLoadingState(false));
			navigate('/');
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
		<div className="signin">
			<h2>Sign In</h2>
			<form onSubmit={handleSubmit}>
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
					Account does not exist? <Link to="/signup">Create account</Link>
				</p>
				<button type="submit">Sign In</button>
			</form>
		</div>
	);
};

export default SignIn;
