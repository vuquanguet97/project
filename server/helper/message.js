const db = require('../models/');

module.exports = {
	createMessage(data, io) {
		const { messageData, messageData: { content }, type } = data;

		if (content.trim()) {
			db.Message.create(messageData, (err) => {
				if (!err) {
					switch (type) {
						case 'User':
							io.emit(data.from, messageData);
							io.emit(data.to, messageData);
							break;
						case 'Group':
							data.members.forEach(userID => {
								io.emit(userID, messageData)
							});
							break;
					}
				}
			});
		}
	},
	getMessages(req, res) {
		const { type } = req.query;

		switch (type) {
			case 'Group':
				db.Message.find({ to: req.query.groupID }, (err, messages) => {
					if (!err) {
						res.status(200).json(messages)
					} else {
						res.send(err);
					}
				});
				break;

				//todo: user case
		}
	}
};
