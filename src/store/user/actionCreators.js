import * as actions from './actionTypes';

export const tokenAdded = (token) => {
	return {
		type: actions.TOKEN_ADDED,
		payload: {
			token,
		},
	};
};

export const userLoggedIn = (userInfo) => ({
	type: actions.USER_LOGGED,
	payload: {
		userInfo,
	},
});

export const userLoggedOut = () => ({
	type: actions.USER_LOGOUT,
});
