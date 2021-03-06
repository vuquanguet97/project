const app           = require('./routes/'),
	  http          = require('http').createServer(app),
	  io            = require('socket.io')(http),
	  messageHelper = require('./helper/message'),
	  path          = require('path');

// render homepage
app.get('*', (req, res) => {
	const staticPath = __dirname.substring(0, __dirname.lastIndexOf(path.sep));

	res.sendFile(`${staticPath}${path.sep}build${path.sep}index.html`);
});

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
