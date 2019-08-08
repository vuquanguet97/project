import io from 'socket.io-client';

let socket = null;

export const getSocket = (userID) => {
	if (!socket) {
		socket =  io({
			query: {
				userID,
			}
		});

		return socket;
	}

	return socket;
};
