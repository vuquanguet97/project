import axios from "axios";
import {handleResponse} from "./index";

export const getGroupInfo = (groupID) => {
	return axios.get(`/group/${groupID}`)
		.then(handleResponse)
		.catch(handleResponse);
};
