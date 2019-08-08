import React from 'react';
import ListChat from "../Components/ListChat/ListChat";
import ChatBox from "../Components/ChatBox/ChatBox";
import {getPersonalInfo} from "../services";
import _ from 'lodash';
import ModalForm from "../common/Profile/ModalForm";
import ListRequest from "../Components/ListRequest/ListRequest";

class Chat extends React.Component {
	userID = localStorage.getItem('userID');

	state = {
		userData: {},
		pickedContact: {},
		pickedContactType: '',

		showProfileModal: false,
		showNotificationModal: false,
	};

	componentDidMount() {
		getPersonalInfo(this.userID)
			.then(userData => {
				this.setState({ userData })
			})
			.catch(console.log);
	}

	toggleProfileModal = () => {
		const { showProfileModal } = this.state;
		this.setState({
			showProfileModal: !showProfileModal,
			showNotificationModal: false,
		})
	};

	toggleNotificationModal = () => {
		const { showNotificationModal } = this.state;
		this.setState({
			showProfileModal: false,
			showNotificationModal: !showNotificationModal,
		})
	};

	pickContact = (contact, type) => {
		this.setState({
			pickedContact: contact,
			pickedContactType: type,
		})
	};

	render() {
		const {
			userData: { avatarUrl, fullName, groups, friends },
			pickedContact,
			pickedContactType,
			showNotificationModal,
			showProfileModal
		} = this.state;
		const members = pickedContactType === 'User' && [
			{
				fullName,
				avatarUrl,
				_id: this.userID,
			},
			pickedContact,
		];
		const membersObject = !!members &&
			_.zipObject(members.map(({ _id }) => _id), members);

		return (
			<div>
				<div className="wrapChat">
					<ListChat
						listGroup={groups || []}
						listFriends={friends || []}
						user={{
							avatarUrl,
							fullName,
						}}
						pickedContact={pickedContact}
						onPickContact={this.pickContact}
						toggleProfileModal={this.toggleProfileModal}
						toggleNotificationModal={this.toggleNotificationModal}
					/>
					{pickedContactType ? (
						<ChatBox
							to={pickedContact}
							type={pickedContactType}
							members={membersObject}
						/>
					) : (
						<div>
							hello
						</div>
					)}
				</div>
				<ModalForm
					showModal={showProfileModal}
					toggleModal={this.toggleProfileModal}
				/>
				<ListRequest
					show={showNotificationModal}
					toggleModal={this.toggleNotificationModal}
				/>
			</div>
		);
	}
}

export default Chat;
