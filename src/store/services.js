import axios from 'axios';

import { API_SERVER_URI, ROUTES } from '../constants';

// USERS
const getUserInfo = async (authToken) => {
	try {
		const response = await axios.get(`${API_SERVER_URI}${ROUTES.USER_INFO}`, {
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
	const response = await axios.post(
		`${API_SERVER_URI}${ROUTES.REGISTER}`,
		formData
	);
	return response;
};

const login = async (formData) => {
	const response = await axios.post(
		`${API_SERVER_URI}${ROUTES.LOGIN}`,
		formData
	);

	return response;
};

const logout = async (authToken) => {
	const response = await axios.delete(`${API_SERVER_URI}${ROUTES.LOGOUT}`, {
		headers: {
			Authorization: authToken,
		},
	});
	return response;
};

//COURSES
const fetchCourses = async () => {
	const response = await axios.get(`${API_SERVER_URI}${ROUTES.COURSES_ALL}`);
	return response;
};

const addCourse = async (authToken, newCourse) => {
	const response = await axios.post(
		`${API_SERVER_URI}${ROUTES.COURSES_ADD}`,
		newCourse,
		{
			headers: {
				Authorization: authToken,
			},
		}
	);
	return response;
};

const updateCourse = async (authToken, newCourse) => {
	const response = await axios.put(
		`${API_SERVER_URI}${ROUTES.COURSES}${newCourse.id}`,
		newCourse,
		{
			headers: {
				Authorization: authToken,
			},
		}
	);
	return response;
};

const deleteCourse = async (authToken, courseId) => {
	const response = await axios.delete(
		`${API_SERVER_URI}${ROUTES.COURSES}${courseId}`,
		{
			headers: {
				Authorization: authToken,
			},
		}
	);
	return response;
};

//AUTHORS
const fetchAuthors = async () => {
	const response = await axios.get(`${API_SERVER_URI}${ROUTES.AUTHORS_ALL}`);
	return response;
};

const addAuthor = async (authToken, authorName) => {
	const response = await axios.post(
		`${API_SERVER_URI}${ROUTES.AUTHORS_ADD}`,
		{ name: authorName },
		{
			headers: {
				Authorization: authToken,
			},
		}
	);
	return response;
};

const api = {
	getUserInfo,
	register,
	login,
	logout,
	fetchCourses,
	addCourse,
	updateCourse,
	deleteCourse,
	fetchAuthors,
	addAuthor,
};

export default api;
