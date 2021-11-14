import * as actions from './actionTypes';

export const tokenAddedAction = (token) => {
	return {
		type: actions.TOKEN_ADDED,
		payload: token,
	};
};

export const userLoggedInAction = (userInfo) => ({
	type: actions.USER_LOGGED,
	payload: userInfo,
});

export const userLoggedOutAction = () => ({
	type: actions.USER_LOGOUT,
});

export const setAuthErrorsAction = (errors) => ({
	type: actions.AUTH_ERRORS,
	payload: errors,
});
