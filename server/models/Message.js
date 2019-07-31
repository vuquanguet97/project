const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: 'type',
	},
	type: {
		type: String,
		required: true,
		enum: ['User', 'Group']
	},
	content: String,
}, {
	timestamps: {}
});

module.exports = mongoose.model('Message', messageSchema);
