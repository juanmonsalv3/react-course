import api from '../services';
import {
	addCourseAction,
	updateCourseAction,
	fetchCoursesAction,
	delteCourseAction,
} from './actionCreators';

export const fetchCoursesThunk = () => async (dispatch, getState) => {
	const response = await api.fetchCourses();
	dispatch(fetchCoursesAction(response.data.result));
};

export const addCourseThunk = (newCourse) => async (dispatch, getState) => {
	const { token } = getState().user;
	const response = await api.addCourse(token, newCourse);
	dispatch(addCourseAction(response.data.result));
};

export const updateCourseThunk = (newCourse) => async (dispatch, getState) => {
	const { token } = getState().user;
	const response = await api.updateCourse(token, newCourse);
	dispatch(updateCourseAction(response.data.result));
};

export const deleteCourseThunk = (courseId) => async (dispatch, getState) => {
	const { token } = getState().user;
	const response = await api.deleteCourse(token, courseId);
	if (response.status === 200) {
		dispatch(delteCourseAction(courseId));
	}
};
