import api from '../services';
import {
	setAuthErrorsAction,
	tokenAddedAction,
	userLoggedInAction,
	userLoggedOutAction,
} from './actionCreators';

export const loginUserThunk = (credentials) => async (dispatch) => {
	try {
		const response = await api.login(credentials);
		if (response.status === 201) {
			const authToken = response.data.result;
			dispatch(tokenAddedAction(authToken));
		}
	} catch (error) {
		if (error.response && error.response.data && error.response.data.errors) {
			dispatch(setAuthErrorsAction(error.response.data.errors));
		} else if (error.response.data && error.response.data.result) {
			dispatch(setAuthErrorsAction([error.response.data.result]));
		} else {
			dispatch(setAuthErrorsAction(['Unknown error, try again later']));
		}
	}
};

export const logoutUserThunk = () => async (dispatch, getState) => {
	await api.logout(getState().user.token);
	dispatch(userLoggedOutAction());
};

export const getUserInfoThunk = () => async (dispatch, getState) => {
	const { token } = getState().user;
	const userInfo = await api.getUserInfo(token);
	dispatch(userLoggedInAction(userInfo));
};
