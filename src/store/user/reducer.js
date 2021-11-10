import { AUTH_TOKEN_KEY } from '../../constants';
import * as actions from './actionTypes';

const userInitialState = {
	isAuth: null, // three state boolean, default null until auth runs - false if user not authenticated, true if authenticated
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: localStorage.getItem(AUTH_TOKEN_KEY) || '', // default value - empty string or token value from localStorage.
	// After success login - value from API /login response. See Swagger.
	role: '',
	authErrors: [],
};

const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.TOKEN_ADDED:
			localStorage.setItem(AUTH_TOKEN_KEY, action.payload);
			return {
				...state,
				token: action.payload,
			};
		case actions.USER_LOGGED:
			const userInfo = action.payload;
			return {
				...state,
				...userInfo,
				isAuth: !!userInfo && userInfo.email,
			};
		case actions.USER_LOGOUT:
			localStorage.removeItem(AUTH_TOKEN_KEY);
			return { ...userInitialState, isAuth: false, token: '' };
		case actions.AUTH_ERRORS:
			return { ...state, authErrors: [...action.payload] };
		default:
			return state;
	}
};

export default userReducer;
