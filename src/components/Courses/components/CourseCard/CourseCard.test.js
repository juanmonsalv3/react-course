import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import CourseCard from './CourseCard';
import rootReducer from '../../../../store/reducer';
import { BrowserRouter } from 'react-router-dom';

test('renders CourseCard correctly', () => {
	const store = createStore(rootReducer, {
		authors: [
			{ id: '1', name: 'Juan' },
			{ id: '2', name: 'Carlos' },
		],
	});

	const course = {
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: ['1', '2'],
	};

	render(
		<Provider store={store}>
			<BrowserRouter>
				<CourseCard {...course} />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.queryByTestId('course-card')).not.toBeNull();
	expect(screen.queryByTestId('course-title').textContent).toBe('JavaScript');
	expect(screen.queryByTestId('course-description').textContent).toBe(
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
	);
	expect(screen.queryByTestId('course-duration').textContent).toBe(
		'02:40 hours'
	);
	expect(screen.queryByTestId('course-authors').textContent).toBe(
		'Juan, Carlos'
	);
	expect(screen.queryByTestId('course-creation-date').textContent).toBe(
		'8/3/2021'
	);
});
