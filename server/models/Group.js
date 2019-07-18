const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	name: {
		type: String,
		required: 'Group must have a name!',
	},
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message',
	}],
	founder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	avatarUrl: String,
	description: String,
}, {
	timestamps: {}
});

module.exports = mongoose.model('Group', groupSchema);
