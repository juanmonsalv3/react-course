import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

function App() {
	return (
		<BrowserRouter>
			<Route path='/' component={Header} />
			<Switch>
				<Route exact path='/' render={() => <Redirect to='/courses' />} />
				<Route path='/login' component={Login} />
				<Route path='/registration' component={Registration} />
				<Route path='/courses' component={Courses} />
			</Switch>
		</BrowserRouter>
	);
}
export default App;
