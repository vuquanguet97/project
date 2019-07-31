import React from 'react';
import Input from '../../common/Input/Input.js';
import Contact from '../../common/Contact/Contact.js';
import TextChat from '../../Components/TextChat/TextChat.js';
import './ChatBox.css';

import avt from '../../common/Input/male-avatar.png';
import plane from '../../common/Input/paper-plane.png';
import avtGroup from '../../Components/TextChat/background2.png';

import io from 'socket.io-client';
import {getMessages} from "../../services";

class ChatBox extends React.Component {
	userID = localStorage.getItem('userID');
	socket = io({
		query: {
			userID: this.userID
		}
	});

	state = {
		text: "",
		messages: [],
	};

	componentDidMount() {
		getMessages({
			type: 'Group',
			groupID: '5d3b2b8fb87876330856d888'
		}).then(messages => {
			this.setState({ messages });

			this.scrollToBottom();
		}).catch(console.log);

		this.socket.on(this.userID, message => {
			this.setState({
				messages: [
					...this.state.messages,
					message
				]
			}, () => {
				this.scrollToBottom();
			})
		})
	}

	scrollToBottom = () => {
		const scroll = this.refs['scroll'];

		scroll.scrollTo(0, scroll.scrollHeight);
	};

	handleSendMessage = () => {
		if (!this.state.text) return;
		const { type } = this.props;

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
			to: this.props.to,
			type: 'User',
		},
		type: 'User',
	});

	makeGroupMessage = () => ({
		messageData: {
			content: this.state.text,
			from: this.userID,
			to: this.props.to,
			type: 'Group',
		},
		members: this.props.members,
		type: 'Group',
	});

	onSubmit = (e) => {
		e.preventDefault();
		this.handleSendMessage();
	};

	render() {
		return (
			<div className="chat-box">
				<div className="header">
					<Contact
						avatarUrl={avtGroup}
						name={<h1>My Group</h1>}
						size={"medium-contact"}
					/>
				</div>
				<div ref='scroll' className="main scrollbar">
					<TextChat
						messages={this.state.messages}
						avatar={avt}
						userID={this.userID}
					/>
				</div>
				<div className="footer">
					<form onSubmit={this.onSubmit}>
						<Input
							value={this.state.text}
							placeholder={"Nhập tại đây"}
							onChange={(e) => {
								this.setState({text: e.target.value})
							}}
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
