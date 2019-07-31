import io from 'socket.io-client';

const socket = io({
	query: {
		userID: localStorage.getItem('userID')
	}
});

export default socket;
