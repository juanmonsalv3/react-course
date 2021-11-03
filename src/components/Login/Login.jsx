import '../Registration/Registration.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { AUTH_TOKEN_KEY } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import api from '../../api';

const Login = ({ onLogin }) => {
	const [formDetails, setFormDetails] = useState({});
	const [errors, setErrors] = useState([]);
	const history = useHistory();

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
				localStorage.setItem(AUTH_TOKEN_KEY, authToken);
				onLogin(authToken);
				history.push('/courses');
			}
		} catch (error) {
			setErrors(error.response.data.errors);
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
		</form>
	);
};

Login.propTypes = {
	onLogin: PropTypes.func,
};

export default Login;
