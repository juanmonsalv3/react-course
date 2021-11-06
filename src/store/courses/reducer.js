import * as actions from './actionTypes';

const coursesInitialState = []; // default value - empty array. After success getting courses from API - array of courses.

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.FETCH_COURSES:
			return action.payload;
		case actions.ADD_COURSE:
			return [...state, action.payload];
		default:
			return state;
	}
};

export default coursesReducer;
