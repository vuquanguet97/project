const app = require('./routes/'),
	http = require('http').createServer(app),
	io = require('socket.io')(http),
	messageHelper = require('./helper/message');

io.use((socket, next) => {
	const token = socket.handshake.query.token;

	// if (!token) { // check if token is valid
	// 	return next(new Error('Authentication error'));
	// }

	return next();
});

io.on('connection', socket => {
	socket.on(socket.handshake.query.userID, data => {
		messageHelper.createMessage(data, io);
	})
});

http.listen(process.env.SERVER_PORT || process.env.PORT, () => {
	console.log('App is running!');
});
