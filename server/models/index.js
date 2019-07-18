const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect(process.env.CONNECTION_STRING, (err) => {
	if (!err) {
		console.log('Database connected!')
	}
});

module.exports.User = require('./User');
module.exports.Message = require('./Message');
module.exports.Group = require('./Group');
