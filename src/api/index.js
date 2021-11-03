import axios from 'axios';

import ENDPOINTS from './endpoints';
import { API_SERVER_URI } from '../constants';

const getUserInfo = async (authToken) => {
	const response = await axios.get(`${API_SERVER_URI}${ENDPOINTS.USER_INFO}`, {
		headers: {
			Authorization: authToken,
		},
	});

	return response.data.result;
};

const register = async (formData) => {
	const response = await axios.post(
		`${API_SERVER_URI}${ENDPOINTS.REGISTER}`,
		formData
	);
	return response;
};

const login = async (formData) => {
	const response = await axios.post(
		`${API_SERVER_URI}${ENDPOINTS.LOGIN}`,
		formData
	);

	return response;
};

const api = {
	getUserInfo,
	register,
	login,
};

export default api;
