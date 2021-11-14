import * as actions from './actionTypes';

export const fetchAuthorsAction = (authors) => ({
	type: actions.FETCH_AUTHORS,
	payload: authors,
});

export const addAuthorAction = (author) => ({
	type: actions.ADD_AUTHOR,
	payload: author,
});
