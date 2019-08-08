const db = require('../models/');

module.exports = {
	createMessage(data, io) {
		const { messageData, messageData: { content }, type } = data;

		if (content.trim()) {
			db.Message.create(messageData, (err) => {
				if (!err) {
					sendMessage(type, io, data)
				} else {
					console.log(err);
				}
			});
		}
	},
	getMessages(req, res) {
		const { type, cursor = 0 } = req.query;
		const options = {
			limit: 50,
			skip: Number(cursor),
			sort: '-createdAt',
		};

		switch (type) {
			case 'Group':
				db.Message.find({ to: req.query.groupID }, null, options, (err, messages) => {
					if (!err) {
						makeMessagesRes(res, cursor, messages);
					} else {
						res.send(err);
					}
				});
				break;
			case 'User':
				const { to, from } = req.query;

				db.Message.find({ $or: [{to, from}, {to: from, from: to}] }, null, options, (err, messages) => {
					if (!err) {
						makeMessagesRes(res, cursor, messages);
					} else {
						res.send(err);
					}
				});
				break;
			default:
				res.status(400).json({
					code: 400,
					message: 'Type of message can only be Group or User'
				})
		}
	}
};

const sendMessage = (type, io, data) => {
	const { messageData } = data;

	switch (type) {
		case 'User':
			io.emit(messageData.from, messageData);
			io.emit(messageData.to, messageData);
			break;
		case 'Group':
			data.members.forEach(userID => {
				io.emit(userID, messageData)
			});
			break;
	}
};

const makeMessagesRes = (res, cursor, messages) => {
	const nextCursor = Number(cursor) + messages.length;

	if (messages.length) {
		res.status(200).json({
			messages: messages.reverse(),
			cursor: nextCursor,
			hasNext: nextCursor % 50 === 0,
		})
	} else {
		res.status(400).json({
			code: 400,
			message: 'Hết tin nhắn rồi!!'
		})
	}
};
