import '../Registration/Registration.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useDispatch } from 'react-redux';
import {
	selectAuthErrors,
	selectIsAuthenticated,
} from '../../store/user/selectors';
import { loginUserThunk } from '../../store/user/thunks';
import { setAuthErrorsAction } from '../../store/user/actionCreators';

const Login = () => {
	const [formDetails, setFormDetails] = useState({});
	const isAuth = useSelector(selectIsAuthenticated);
	const authErrors = useSelector(selectAuthErrors);
	const dispatch = useDispatch();

	if (isAuth) {
		return <Redirect to='/courses' />;
	}

	const updateFormDetails = (key, e) => {
		dispatch(setAuthErrorsAction([]));
		setFormDetails({ ...formDetails, [key]: e.target.value });
	};

	const onSubmit = async (e) => {
		dispatch(setAuthErrorsAction([]));

		e.preventDefault();
		dispatch(loginUserThunk(formDetails));
	};

	return (
		<form className='registration-form' onSubmit={onSubmit}>
			<h2 className='title'>Login</h2>
			<Input
				className='registration-input'
				labelText='Name'
				placeholderText='Enter Name'
				onChange={updateFormDetails.bind(null, 'name')}
			/>
			<Input
				className='registration-input'
				labelText='Email'
				placeholderText='Enter Email'
				onChange={updateFormDetails.bind(null, 'email')}
			/>
			<Input
				className='registration-input'
				labelText='Password'
				placeholderText='Enter Password'
				inputType='password'
				onChange={updateFormDetails.bind(null, 'password')}
			/>
			<Button
				buttonText='Login'
				className='registration-button'
				buttonType='submit'
			/>

			{authErrors.length > 0 && (
				<>
					<p>There are some errors:</p>
					<ul className='errors-list'>
						{authErrors.map((e, i) => (
							<li key={i}>{e}</li>
						))}
					</ul>
				</>
			)}

			<p>
				If you don't have an account,
				<Link to='/registration'>Register here</Link>
			</p>
		</form>
	);
};

Login.propTypes = {
	onLogin: PropTypes.func,
};

export default Login;
