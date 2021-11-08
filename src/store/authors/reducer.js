import * as actions from './actionTypes';

const authorsInitialState = []; // default value - empty array. After success getting authors from API - array of authors.

const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actions.FETCH_AUTHORS:
			return action.payload;
		case actions.ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
};

export default authorsReducer;
