import React from 'react';
import io from 'socket.io-client';
import './ChatExperiment.css';

export default class ChatExperiment extends React.Component {
	state = {
		message: '',
		messages: [],
	};

	socket = io({
		query: {
			token: 'nothing',
			userID: '1',
		}
	});

	componentDidMount() {
		this.socket.on('error', (e) => {
			console.log(e)
		});

		this.socket.on('1', ({message}) => {
			this.setState({
				messages: [
					message,
					...this.state.messages,
				]
			});

		})
	}

	handleChangeMessage = e => {
		this.setState({
			message: e.target.value,
		})
	};

	handleSendMessage = () => {
		this.socket.emit('1', { message: this.state.message });
		this.refs['scroll'].scrollTo(0, this.refs['scroll'].scrollHeight)
	};

	render() {
		return (
			<div>
				<div
					ref={'scroll'}
					style={{
						overflowY: 'auto',
						height: 600
					}}
					className={'scrollbar'}
				>
					<ul id="messages" style={{
						overflow: 'hidden',
						transform: 'scale(-1)'
					}}>
						{this.state.messages.map((message, index) => (
							<li key={index} style={{transform: 'scale(-1)'}}>{message}</li>
						))}
					</ul>
				</div>
				<div className={'form'}>
					<input
						id="m"
						autoComplete="off"
						value={this.state.message}
						onChange={this.handleChangeMessage}
					/>
					<button onClick={this.handleSendMessage}>Send</button>
				</div>
			</div>
		);
	}
}
