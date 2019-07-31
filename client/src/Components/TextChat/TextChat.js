import React from 'react';
import PropTypes from 'prop-types';
import './TextChat.css';
import Contact from '../../common/Contact/Contact.js';

const MessageLeft = ({avatar, message, showAvatar}) => {
	return (<div className='listTextLeft'>
		<div className="avatar-left">
			{showAvatar &&
			//     <img className="avatar-left"
			//     alt="useravt"
			//     src={avatar}
			// />
			<Contact
				avatarUrl={avatar}
				size={'small-contact'}
			/>
			}

		</div>
		<div className="text-left">
			{message}
		</div>
	</div>)
}

const MessageRight = ({avatar, message, showAvatar}) => {
	return (<div className='listTextRight'>
		<div className="text-right">
			{message}
		</div>
		<div className="avatar-right">
			{showAvatar &&
			//     <img className="avatar-right"
			//     alt="useravt"
			//     src={avatar}
			// />
			<Contact
				avatarUrl={avatar}
				size={'small-contact'}
			/>
			}

		</div>
	</div>)
}


class TextChat extends React.Component {
	static propTypes = {
		avatar: PropTypes.any,
		showAvatar: PropTypes.bool,

	};
	static defaultProps = {
		showAvatar: false,
	};

	render() {
		const messageHistory = this.props.messages.map((message, index, messages) => {
			if (index === 0) {
				return message.from !== this.props.userID ? (
					<MessageLeft
						key={index}
						message={message.content}
						showAvatar={true}
						avatar={this.props.avatar}
					/>
				) : (
					<MessageRight
						message={message.content}
						showAvatar={true}
						avatar={this.props.avatar}
						key={index}
					/>
				);
			} else if (message.from === messages[index - 1].from) {
				return message.from !== this.props.userID ? (
					<MessageLeft
						key={index}
						message={message.content}
					/>
				) : (
					<MessageRight
						key={index}
						message={message.content}
					/>
				);
			} else {
				return message.from !== this.props.userID ? (
					<MessageLeft
						key={index}
						message={message.content}
						showAvatar={true}
						avatar={this.props.avatar}
					/>
				) : (
					<MessageRight
						key={index}
						message={message.content}
						showAvatar={true}
						avatar={this.props.avatar}
					/>
				);
			}
		}).reverse();

		return (
			<div className="Messages-list">
				{messageHistory}
			</div>
		);
	}

}

export default TextChat;
