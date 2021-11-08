import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import api from './store/services';
import { selectAuthToken } from './store/user/selectors';
import { userLoggedIn } from './store/user/actionCreators';

function App() {
	const authToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();

	useEffect(() => {
		if (authToken) {
			api.getUserInfo(authToken).then((userInfo) => {
				dispatch(userLoggedIn(userInfo));
			});
		}
	}, [dispatch, authToken]);

	return (
		<BrowserRouter>
			<Route path='/' component={Header} />
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/registration' component={Registration} />
				<Route path='/courses' component={Courses} />
			</Switch>
		</BrowserRouter>
	);
}
export default App;
