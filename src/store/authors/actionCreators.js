import api from '../services';
import * as actions from './actionTypes';

export async function fetchAuthors(dispatch, getState) {
	try {
		const response = await api.fetchAuthors();
		dispatch({ type: actions.FETCH_AUTHORS, payload: response.data.result });
	} catch (error) {
		console.error(error);
	}
}

export const addAuthor = (author) => ({
	type: actions.ADD_AUTHOR,
	payload: author,
});
