import axios from "axios";
import {handleResponse} from "./index";

export const getMessages = (params, signal) => {
	const { type } = params;

	switch (type) {
		case 'Group': case 'User':
			return new Promise((resolve, reject) => {
				signal.addEventListener('abort', () => reject({
					error: 'Cancel Promise'
				}));

				axios.get('/message', { params })
					.then((data) => resolve(handleResponse(data)))
					.catch(handleResponse);
			});
		default:
			return Promise.reject({
				error: 'Type can only be Group or User'
			});
	}
};
