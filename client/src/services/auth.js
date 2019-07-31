import axios from "axios";
import {handleResponse} from "./index";

export const registerUser = async (userData) => {
	return axios.post('/auth/register', userData)
		.then(handleResponse)
		.catch(handleResponse)
};

export const loginUser = async (userData) => {
	return axios.post('/auth/login', userData)
		.then(handleResponse)
		.catch(handleResponse)
};
