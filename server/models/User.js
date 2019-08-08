const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
	sendingRequests: [{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		seen: Boolean,
		accepted: Boolean,
	}],
	incomingRequests: [{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		seen: Boolean,
	}],
	avatarUrl: String,
	lastLogin: Date,
}, {
	timestamps: {}
});

userSchema.methods.isCorrectPassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, same) {
		if (err) {
			callback(err);
		} else {
			callback(err, same);
		}
	});
};

// userSchema.methods.updateToken = function(token, callback){
//
// }

userSchema.pre('save', function (next) {
	const user = this;
	if(user.register === 1){
		bcrypt.hash(user.password, 10, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		})
	} else {
		next();
	}
});
module.exports = mongoose.model('User', userSchema);
