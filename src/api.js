import axios from 'axios';

const API_SERVER_URI = 'http://localhost:3000';

const getUserInfo = async (authToken) => {
	const response = await axios.get(`${API_SERVER_URI}/users/me`, {
		headers: {
			Authorization: authToken,
		},
	});

	return response.data.result;
};

const register = async (formData) => {
	const response = await axios.post(`${API_SERVER_URI}/register`, formData);
	return response;
};

const api = {
	getUserInfo,
	register,
};

export default api;
