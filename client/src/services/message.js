import axios from "axios";
import {handleResponse} from "./index";

export const getMessages = (data) => {
	const { type } = data;

	switch (type) {
		case 'Group':
			return axios.get('/message', {
				params: {
					type,
					groupID: data.groupID,
				}
			}).then(handleResponse).catch(handleResponse);
		case 'User':
			return axios.get('/message', {
				params: {
					type,
					from: data.from,
					to: data.to,
				}
			}).then(handleResponse).catch(handleResponse);
		default:
			return;
	}
};
