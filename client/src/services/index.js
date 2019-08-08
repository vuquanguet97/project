export const handleResponse = async res => {
	if (res.isAxiosError) {
		return Promise.reject(res.response.data);
	} else {
		return Promise.resolve(res.data);
	}
};

export * from './auth';
export * from './message';
export * from './user';
export * from './group';
export * from './socket';
