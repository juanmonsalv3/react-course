import api from '../services';
import { addAuthorAction, fetchAuthorsAction } from './actionCreators';

export const fetchAuthorsThunk = () => async (dispatch, getState) => {
	try {
		const response = await api.fetchAuthors();
		dispatch(fetchAuthorsAction(response.data.result));
	} catch (error) {
		console.error(error);
	}
};

export const addAuthorThunk = (authorName) => async (dispatch, getState) => {
	const { token } = getState().user;
	const response = await api.addAuthor(token, authorName);

	dispatch(addAuthorAction(response.data.result));
};
