import React from 'react';
import ListChat from "../Components/ListChat/ListChat";
import ChatBox from "../Components/ChatBox/ChatBox";

class Chat extends React.Component {
	render() {
		return (
			<div>
				<ListChat
					listGroup={[
						{
							name: 'Dung',
							avatarUrl: 'https://icon-library.net/images/facebook-user-icon/facebook-user-icon-19.jpg',
						},
						{
							name: 'Dung',
							avatarUrl: 'https://icon-library.net/images/facebook-user-icon/facebook-user-icon-19.jpg',
						},
						{
							name: 'Dung',
							avatarUrl: 'https://icon-library.net/images/facebook-user-icon/facebook-user-icon-19.jpg',
						},
					]}
					listContact={[
						{
							name: 'Dung',
							avatarUrl: 'https://icon-library.net/images/facebook-user-icon/facebook-user-icon-19.jpg',
						},
						{
							name: 'Dung',
							avatarUrl: 'https://icon-library.net/images/facebook-user-icon/facebook-user-icon-19.jpg',
						},
						{
							name: 'Dung',
							avatarUrl: 'https://icon-library.net/images/facebook-user-icon/facebook-user-icon-19.jpg',
						},
					]}
					user={{
						avatarUrl: 'https://icon-library.net/images/facebook-user-icon/facebook-user-icon-19.jpg',
						name: 'Dung'
					}}
				/>
				<ChatBox
					to={'5d3b2b8fb87876330856d888'}
					members={[
						'5d3ab15eea1344157870596f',
						'5d3aa2456c8f6d2e242928b7',
						'5d3fa0b800ade52e68af03d1',
					]}
					type={'Group'}
				/>
				{/*<ChatBox*/}
					{/*to={'5d3ab15eea1344157870596f'}*/}
					{/*type={'User'}*/}
				{/*/>*/}
			</div>
		);
	}
}

export default Chat;
