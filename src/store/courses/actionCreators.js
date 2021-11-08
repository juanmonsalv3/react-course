import moment from 'moment';
import api from '../services';
import * as actions from './actionTypes';
import { generateId } from '../../helpers/uuid';

export async function fetchCourses(dispatch, getState) {
	try {
		const response = await api.fetchCourses();
		dispatch({ type: actions.FETCH_COURSES, payload: response.data.result });
	} catch (error) {
		console.error(error);
	}
}

export const addCourse = (course) => ({
	type: actions.ADD_COURSE,
	payload: {
		...course,
		id: generateId(),
		creationDate: moment().format('DD/MM/yyyy'),
	},
});
