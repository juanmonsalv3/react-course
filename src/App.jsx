import React from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';

function App() {
	return (
		<div>
			<Header user='Dave' />
			<Courses />
		</div>
	);
}
export default App;
