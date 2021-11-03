import './Registration.css';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../../api';

const Registration = () => {
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
			api.register(formDetails);
			const response = await api.register(formDetails);
			if (response.status === 201) {
				history.push('/login');
			}
		} catch (error) {
			setErrors(error.response.data.errors);
		}
	};

	return (
		<form className='registration-form' onSubmit={onSubmit}>
			<h2 className='title'>Registration</h2>
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
				buttonText='Registration'
				className='register-button'
				buttonType='submit'
			/>

			<p>
				If you have an account, you can <Link to='/login'>login</Link>
			</p>

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

export default Registration;
