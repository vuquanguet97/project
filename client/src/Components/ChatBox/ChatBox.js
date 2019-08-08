import React from 'react';
import Input from '../../common/Input/Input.js';
import Contact from '../../common/Contact/Contact.js';
import TextChat from '../../Components/TextChat/TextChat.js';
import './ChatBox.css';

import plane from '../../common/Input/paper-plane.png';
import defaultAvatar from '../../assets/male-avatar.png';

import _ from 'lodash';
import {getGroupInfo, getMessages, getSocket} from "../../services";

const INITIAL_STATE = {
	text: "",
	messages: [],
	cursor: 0,
	hasNext: false,
};

class ChatBox extends React.Component {
	userID = localStorage.getItem('userID');
	controller = new AbortController();
	apiCalls = 0;
	socket = getSocket(this.userID);

	state = {
		...INITIAL_STATE,
		members: this.props.members,
	};

	componentDidMount() {
		this.getInitialData(this.props);

		this.socket.on(this.userID, this.onGetNewMessage)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.to._id !== this.props.to._id) {
			this.setState({
				...INITIAL_STATE,
				members: nextProps.members
			}, () => {
				this.cancelApiCall();
				this.getInitialData(nextProps);
			});
		}
	}

	cancelApiCall = () => {
		if (this.apiCalls > 0) {
			this.controller.abort();
			this.controller = new AbortController();
			this.apiCalls--;
		}
	};

	onGetNewMessage = message => {
		const { type: contactType, to: { _id: receiverID } } = this.props;
		const { type } = message;

		if (type !== contactType) return;

		if (this.isReceiverTypeGood(message, receiverID)) {
			this.setState({
				messages: [
					...this.state.messages,
					message
				]
			}, () => {
				this.scrollToBottom();
			})
		}
	};

	isReceiverTypeGood = (message, receiverID) => {
		const { type, to, from } = message;

		const isGroupMessage = type === 'Group' && to === receiverID;
		const isUserMessage = type === 'User' &&
			((to === receiverID && from === this.userID) || (to === this.userID && from === receiverID));

		return isGroupMessage || isUserMessage;
	};

	getInitialData = (props) => {
		const { to, type } = props;
		const chatBoxInfo = this.getChatBoxInfo(props);

		this.apiCalls++;

		Promise.all([
			getMessages(chatBoxInfo, this.controller.signal),
			type === 'Group' && getGroupInfo(to._id)
		]).then(([messageData, groupInfo]) => {
			this.apiCalls--;

			const { messages, cursor, hasNext } = messageData;
			const { members } = groupInfo;

			const membersObject = type === 'Group' &&
				_.zipObject(members.map(({ _id }) => _id), members);

			this.setState({
				messages, cursor, hasNext,
				members: !!membersObject ? membersObject : this.state.members,
			});
			this.scrollToBottom();
		}).catch(console.log);
	};

	getMoreMessages = () => {
		const scrollBar = this.refs['scroll'];
		const oldHeight = scrollBar.scrollHeight;
		const {messages: oldMessages, hasNext} = this.state;
		const chatBoxInfo = this.getChatBoxInfo(this.props);

		if (scrollBar.scrollTop === 0 && hasNext) {
			getMessages(chatBoxInfo, this.controller.signal)
			  .then(({ messages, cursor, hasNext }) => {
				this.setState({
					messages: [
						...messages,
						...oldMessages,
					],
					cursor,
					hasNext,
				});
				scrollBar.scrollTo(0, scrollBar.scrollHeight - oldHeight);
			}).catch(console.log);
		}
	};

	getChatBoxInfo = ({ to, type }) => type === 'Group' ? ({
		type,
		groupID: to._id,
		cursor: this.state.cursor,
	}) : ({
		type,
		to: to._id,
		from: this.userID,
		cursor: this.state.cursor,
	});

	handleSendMessage = () => {
		if (!this.state.text) return;
		const {type} = this.props;

		switch (type) {
			case 'User':
				this.socket.emit(this.userID, this.makeUserMessage());
				break;
			case 'Group':
				this.socket.emit(this.userID, this.makeGroupMessage());
				break;
			default:
				return;
		}
		this.setState({text: ''})
	};

	makeUserMessage = () => ({
		messageData: {
			content: this.state.text,
			from: this.userID,
			to: this.props.to._id,
			type: 'User',
		},
		type: 'User',
	});

	makeGroupMessage = () => ({
		messageData: {
			content: this.state.text,
			from: this.userID,
			to: this.props.to._id,
			type: 'Group',
		},
		members: Object.keys(this.state.members),
		type: 'Group',
	});

	scrollToBottom = () => {
		const scrollBar = this.refs['scroll'];

		scrollBar.scrollTo(0, scrollBar.scrollHeight);
	};

	onChangeText = e => {
		this.setState({text: e.target.value})
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.handleSendMessage();
	};

	render() {
		const { members, messages, text } = this.state;
		const { to: { avatarUrl, name, fullName } } = this.props;

		return (
			<div className="chat-box">
				<div className="header">
					<Contact
						avatarUrl={avatarUrl || defaultAvatar}
						name={<h2>{name || fullName}</h2>}
						size={"medium-contact"}
					/>
				</div>
				<div
					ref='scroll'
					className="main scrollbar"
					onScroll={this.getMoreMessages}
				>
					<TextChat
						messages={messages}
						members={members}
						userID={this.userID}
					/>
				</div>
				<div className="footer">
					<form onSubmit={this.onSubmit}>
						<Input
							value={text}
							placeholder={"Nhập tin nhắn"}
							onChange={this.onChangeText}
							onClick={this.handleSendMessage}
							inputSize={'big-input'}
							rightIcon={plane}
						/>
					</form>
				</div>
			</div>
		);
	}
}

export default ChatBox;
