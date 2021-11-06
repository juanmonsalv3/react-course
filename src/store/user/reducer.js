import { AUTH_TOKEN_KEY } from '../../constants';
import * as actions from './actionTypes';

const userInitialState = {
	isAuth: null, // three state boolean, default null until auth runs - false if user not authenticated, true if authenticated
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: localStorage.getItem(AUTH_TOKEN_KEY) || '', // default value - empty string or token value from localStorage.
	// After success login - value from API /login response. See Swagger.
};

const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.TOKEN_ADDED:
			const { token } = action.payload;
			localStorage.setItem(AUTH_TOKEN_KEY, token);
			return {
				...state,
				token,
			};
		case actions.USER_LOGGED:
			const { userInfo } = action.payload;
			return {
				...state,
				...userInfo,
				isAuth: !!userInfo,
			};
		case actions.USER_LOGOUT:
			localStorage.removeItem(AUTH_TOKEN_KEY);
			return { ...userInitialState, isAuth: false };
		default:
			return state;
	}
};

export default userReducer;
