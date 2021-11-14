import * as actions from './actionTypes';

const coursesInitialState = []; // default value - empty array. After success getting courses from API - array of courses.

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.FETCH_COURSES:
			return action.payload;
		case actions.ADD_COURSE:
			return [...state, action.payload];
		case actions.UPDATE_COURSE:
			return state.map((course) =>
				course.id === action.payload.id ? action.payload : course
			);
		case actions.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
};

export default coursesReducer;
