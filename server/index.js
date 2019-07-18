const app     = require('./routes/'),
	  http    = require('http').createServer(app),
	  io      = require('socket.io')(http);

http.listen(process.env.SERVER_PORT || process.env.PORT, () => {
	console.log('App is running!');
});
