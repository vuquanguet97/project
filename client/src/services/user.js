import axios from "axios";
import {handleResponse} from "./index";

export const getUserInfo = async (userID) => {
	return axios.get('/user/'+ userID, {
		headers: {
			'access-token': '1'
		}
	})
		.then(handleResponse)
		.catch(handleResponse)
};
export const getPersonalInfo = (userID) => {
	return axios.get(`/user/${userID}/home`)
		.then(handleResponse)
		.catch(handleResponse)
};

export function getSearchFriend(search){
	return axios({
		 method: "GET",
		 url: `/user/search/${search}`,
	   })
	   .then(handleResponse)
	   .catch(handleResponse)
	}

export const editUserInfo = (userID, userData) => {
	return axios.put('/user/' + userID, userData)
	.then(handleResponse)
	.catch(handleResponse)
}

export const changePassword = ( userID, userData) => {
	return axios.put(`/user/${userID}/pass`, userData)
	.then(handleResponse)
	.catch(handleResponse)
};
