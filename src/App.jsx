import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { AUTH_TOKEN_KEY } from './constants';
import api from './api';

function App() {
	const [userInfo, setUserInfo] = useState(null);
	const [authToken, setAuthToken] = useState(
		localStorage.getItem(AUTH_TOKEN_KEY)
	);

	useEffect(() => {
		if (authToken) {
			api.getUserInfo(authToken).then(setUserInfo);
		}
	}, [authToken]);

	const onLogout = () => {
		setUserInfo(null);
		setAuthToken(null);
		localStorage.removeItem(AUTH_TOKEN_KEY);
	};

	return (
		<BrowserRouter>
			<Route
				path='/'
				render={(props) => (
					<Header
						{...props}
						userInfo={userInfo}
						authToken={authToken}
						onLogout={onLogout}
					/>
				)}
			/>
			<Switch>
				<Route path='/courses' component={Courses} />
				<Route path='/registration' component={Registration} />
				<Route
					path='/login'
					render={(props) => <Login {...props} onLogin={setAuthToken} />}
				/>
			</Switch>
		</BrowserRouter>
	);
}
export default App;
