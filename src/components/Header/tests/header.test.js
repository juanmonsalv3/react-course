import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Header from '../Header';
import { createStore } from 'redux';
import rootReducer from '../../../store/reducer';

test('renders Header null if no user info', () => {
	const store = createStore(rootReducer, { user: {} });
	render(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	expect(screen.queryByTestId('header')).toBeNull();
	expect(screen.queryByTestId('username')).toBeNull();
});

test('renders user info correctly', () => {
	const store = createStore(rootReducer, {
		user: {
			name: 'Juan',
			isAuth: true,
			token: '123123123',
		},
	});

	render(
		<Provider store={store}>
			<Header />
		</Provider>
	);

	expect(screen.queryByTestId('header')).not.toBeNull();
	expect(screen.getByText('Juan')).not.toBeNull();
	expect(screen.queryByTestId('username')).not.toBeNull();
	expect(screen.queryByTestId('username').textContent).toBe('Juan');
});
