import axios from 'axios';

import { API_SERVER_URI } from '../constants';

const USER_INFO = '/users/me';
const REGISTER = '/register';
const LOGIN = '/login';
const COURSES_ALL = '/courses/all';
const AUTHORS_ALL = '/authors/all';

// USERS
const getUserInfo = async (authToken) => {
	try {
		const response = await axios.get(`${API_SERVER_URI}${USER_INFO}`, {
			headers: {
				Authorization: authToken,
			},
		});
		return response.data.result;
	} catch (error) {
		return null;
	}
};

const register = async (formData) => {
	const response = await axios.post(`${API_SERVER_URI}${REGISTER}`, formData);
	return response;
};

const login = async (formData) => {
	const response = await axios.post(`${API_SERVER_URI}${LOGIN}`, formData);

	return response;
};

//COURSES
const fetchCourses = async () => {
	const response = await axios.get(`${API_SERVER_URI}${COURSES_ALL}`);
	return response;
};

//AUTHORS
const fetchAuthors = async () => {
	const response = await axios.get(`${API_SERVER_URI}${AUTHORS_ALL}`);
	return response;
};

const api = {
	getUserInfo,
	register,
	login,
	fetchCourses,
	fetchAuthors,
};

export default api;
