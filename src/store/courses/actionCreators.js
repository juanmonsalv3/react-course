import * as actions from './actionTypes';

export const fetchCoursesAction = (courses) => ({
	type: actions.FETCH_COURSES,
	payload: courses,
});

export const addCourseAction = (newCourse) => ({
	type: actions.ADD_COURSE,
	payload: newCourse,
});

export const updateCourseAction = (newCourse) => ({
	type: actions.UPDATE_COURSE,
	payload: newCourse,
});

export const delteCourseAction = (courseId) => ({
	type: actions.DELETE_COURSE,
	payload: courseId,
});
