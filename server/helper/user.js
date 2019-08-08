const {User} = require('../models');
bcrypt = require('bcrypt');

module.exports = {
	searchFriend: function (req, res) {
		const regex = req.params.search;
		User.find({fullName: new RegExp(regex, 'i')})
			.then(data => res.json(data))
			.catch(err => console.log({message: err}))
	},
	getHomeInfo: function (req, res) {
		try {
			var userID = req.params.userID;
			User
				.findOne({_id: userID}, 'fullName sendingRequests incomingRequests avatarUrl -_id')
				.populate('friends', 'avatarUrl fullName')
				.populate('groups', 'avatarUrl name')
				.then(user => {
					res.status(200).json(user);
				})
		} catch (e) {
			console.log('===================>', e);
			res.status(404).json({
				code: 404,
				success: false,
				message: 'không tìm thấy'
			});
		}
	},
	getUserInfo: function (req, res) {
		try {
			var userID = req.params.userID;
			User
				.findById(userID, 'fullName birthDate avatarUrl gender username email -_id')
				.then(user => {
					res.status(200).json(user);
				})
		} catch (e) {
			console.log('===================>', e)
			res.status(404).json({
				code: 404,
				success: false,
				message: 'không tìm thấy'
			});
		}
	},
	changePassword: async function (req, res) {
		try {
			const {checkPassword, newPassword} = req.body;
			var userID = req.params.userID;
			User.findById(userID, 'password', (error, user) => {
                const {password} = user;
				bcrypt.compare(checkPassword, password, function (e, isCorrect) {
					if (e || !isCorrect) {
						res.status(400).json({
							code: 400,
							message: 'Sai mật khẩu'
						})
					} else {
						if (newPassword !== checkPassword) {
							bcrypt.hash(newPassword, 10, function (err, hash) {
								if (err) {
									return res.send(err);
								} else {
									User.findByIdAndUpdate(userID, {password: hash})
										.then(user => {
											res.status(200).json({
												code: 200,
												success: true,
											});
										})
								}
							})
						}
					}
				})

			})
		} catch (e) {
			console.log('===================>', e)
			res.status(400).json({
				code: 400,
				success: false,
				message: 'có gì đó không đúng'
			});
		}
	},
	editUserInfo: function (req, res) {
		const {fullName, birthDate, avatarUrl, ...otherProps} = req.body;
		var userID = req.params.userID;

		if (Object.keys(otherProps).length) {
			res.status(400).json({
				code: 400,
				message: 'Không thể cập nhật các trường ngoài trường fullName, birthDate và avatar url'
			})
		} else {
			User.findById(userID, (err, user) => {
				if (!err) {
					if (fullName) {
						user.fullName = fullName;
					}
					if (birthDate) {
						user.birthDate = birthDate;
					}
					if (avatarUrl) {
						user.avatarUrl = avatarUrl;
					}

					user.save(null, () => {
						res.status(200).json({
							success: true,
						});
					});
				} else {
					res.send(err);
				}
			})
		}
	},
	getListFriend: function (req, res) {
		try {
			var userID = req.params.userID;
			User
				.findOne({_id: userID})
				.populate('friends', 'id')
				.then(listFriend => {
					res.status(200).json(listFriend.friends);
				})
		} catch (e) {
			console.log('===================>', e)
			res.status(400).json({
				code: 400,
				success: false,
				message: 'có gì đó không đúng'
			})
		}
	},
	sendingRequestAddFriend: function (req, res) {
		let {friendID} = req.body;
		let userID = req.params.userID;

		try {
			User.find({_id: [userID, friendID]}, function (err, users) {
				if (err) throw err;

				let me, friend;

				if (users[0]._id.toString() === userID) {
					[me, friend] = users;
				} else {
					[friend, me] = users;
				}

				me['sendingRequests'].push({
					user: friendID
				});
				friend['incomingRequests'].push({
					user: userID,
				});

				Promise.all([me.save(), friend.save()])
					.then(() => {
						res.status(200).json({
							code: 200,
							success: true,
						})
					})
					.catch(res.send)
			})
		} catch (e) {
			console.log('binhdh ===============>', e);
			res.status(400).json({
				code: 400,
				success: false,
				message: "Ops co loi roi! Xin vui long thu lai"
			})
		}
	},
	actionFriendRequest: function (req, res) {
		try {
			let {actionSubmit, requestedUsers} = req.body;
			let userID = req.params.userID;

			User.findById(userID, function (err, user) {
				user['incomingRequests'].pop({
					user: requestedUsers
				});
				if (actionSubmit === 'true') {
					user['friends'].push(requestedUsers)
				}
				user.save()
			});

			User.findById(requestedUsers, function (err, user) {
				user['sendingRequests'].pop({
					user: userID
				});
				if (actionSubmit === 'true') {
					user['friends'].push(userID)
				}
				user.save()
			})

		} catch (e) {

		}
	},
	getListRequestingFriend: function (req, res) {
		try {
			let userID = req.params.userID;

			User.findById(userID, function (err, user) {
				if (user) {
					for (let i = 0; i < 5; i++) {
						console.log(user['sendingRequests'][i]);
						res.json({id: user['sendingRequests'][i]});
						User.findById(user['sendingRequests'][i], function (err, contact) {
							console.log(contact);
							res.json({
								name: contact.fullName,
								birthday: contact.birthDate,
								avatar: contact.avatarUrl,
								gender: contact.gender
							})
						})
					}
				}
			})
		} catch (e) {

		}
	},
	getListRequestedFriend: function (req, res) {
		try {
			let userID = req.params.userID;

			User.findById(userID, function (err, user) {
				if (user) {
					for (let i = 0; i < user['incomingRequests'].length(); i++) {
						User.findById(user['incomingRequests'][i], function (err, contact) {
							res.json({
								name: contact.fullName,
								birthday: contact.birthDate,
								avatar: contact.avatarUrl,
								gender: contact.gender
							})
						})
					}
				}
			})
		} catch (e) {

		}
	},
	getListGroup: function (req, res) {
		try {
			var userID = req.params.userID;
			User
				.findById(userID, 'groups -_id')
				.then(listGroup => {
					res.status(200).json(listGroup);
				})
		} catch (e) {
			console.log('===================>', e)
			res.status(400).json({
				code: 400,
				success: false,
				message: "lỗi"
			})
		}
	},
};
