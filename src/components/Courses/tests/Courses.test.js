import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Courses from '../Courses';
import rootReducer from '../../../store/reducer';

test('renders Empty container if courses array length is 0', () => {
	const store = createStore(rootReducer, {
		authors: [],
		courses: [],
	});

	const history = createMemoryHistory();
	history.push('/courses');
	render(
		<Provider store={store}>
			<Router history={history}>
				<Courses fetchCourses={false} />
			</Router>
		</Provider>
	);

	expect(screen.queryByTestId('courses-section')).not.toBeNull();
	expect(screen.queryByTestId('no-courses-notice')).not.toBeNull();
	expect(screen.queryByTestId('courses-list').children.length).toBe(0);
});

test('renders courses list correctly', () => {
	const store = createStore(rootReducer, {
		authors: [
			{ id: '1', name: 'Juan' },
			{ id: '2', name: 'Carlos' },
		],
		courses: [
			{
				id: '1',
				title: 'Course 1',
				description: `Description 1`,
				creationDate: '1/1/2021',
				duration: 160,
				authors: ['1'],
			},
			{
				id: '2',
				title: 'Course 2',
				description: `Description 2`,
				creationDate: '2/2/2021',
				duration: 60,
				authors: ['2'],
			},
		],
	});
	const history = createMemoryHistory();
	history.push('/courses');
	render(
		<Provider store={store}>
			<Router history={history}>
				<Courses fetchCourses={false} />
			</Router>
		</Provider>
	);

	expect(screen.queryByTestId('courses-section')).not.toBeNull();
	expect(screen.queryByTestId('no-courses-notice')).toBeNull();
	expect(screen.queryByTestId('courses-list').children.length).toBe(2);
});

test('renders CourseForm when click on add new course', () => {
	const store = createStore(rootReducer, {
		authors: [],
		courses: [],
	});

	const history = createMemoryHistory();
	history.push('/courses');
	render(
		<Provider store={store}>
			<Router history={history}>
				<Courses fetchCourses={false} />
			</Router>
		</Provider>
	);

	fireEvent.click(screen.getByTestId('create-course-btn'));
	expect(screen.queryByTestId('course-form-section')).not.toBeNull();
});
