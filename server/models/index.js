const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect(process.env.CONNECTION_STRING, (err) => {
	if (!err) {
		console.log('Database connected!')
	}
});

const User = require('./User');
const Message = require('./Message');
const Group = require('./Group');

module.exports = { User, Message, Group }