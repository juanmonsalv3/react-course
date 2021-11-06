import '../Registration/Registration.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useDispatch } from 'react-redux';
import { tokenAdded } from '../../store/user/actionCreators';
import { selectIsAuthenticated } from '../../store/user/selectors';
import api from '../../store/services';

const Login = () => {
	const [formDetails, setFormDetails] = useState({});
	const [errors, setErrors] = useState([]);
	const isAuth = useSelector(selectIsAuthenticated);
	const dispatch = useDispatch();

	if (isAuth) {
		return <Redirect to='/courses' />;
	}

	const updateFormDetails = (key, e) => {
		setErrors([]);
		setFormDetails({ ...formDetails, [key]: e.target.value });
	};

	const onSubmit = async (e) => {
		setErrors([]);

		e.preventDefault();
		try {
			const response = await api.login(formDetails);
			if (response.status === 201) {
				const authToken = response.data.result;
				dispatch(tokenAdded(authToken));
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.errors) {
				setErrors(error.response.data.errors);
			} else if (error.response.data && error.response.data.result) {
				setErrors([error.response.data.result]);
			} else {
				setErrors(['Unknown error, try again later']);
			}
		}
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

			{errors.length > 0 && (
				<>
					<p>There are some errors:</p>
					<ul className='errors-list'>
						{errors.map((e, i) => (
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
