const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: 'email is required!',
		unique: true,
	},
	username: {
		type: String,
		required: 'username is required!',
		unique: true,
	},
	password: {
		type: String,
		required: 'password is required!',
	},
	token: String,
	fullName: String,
	gender: String,
	birthDate: Date,
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
	}],
	friends: [{
		friend: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		messages: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
		}],
	}],
	requestingUsers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
	requestedUsers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
	avatarUrl: String,
}, {
	timestamps: {}
});

module.exports = mongoose.model('User', userSchema);
