import React from 'react';
import Contact from '../../common/Contact/Contact';
import ContactType from '../../common/ContactType/ContactType';
import './Listchat.css';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import Notication from './Notication';
import defaultAvatar from '../../assets/male-avatar.png';
import Search from '../Search/Search';
import {getSearchFriend} from '../../services';
import imgSearch from '../../assets/search.png';
import Modal from 'react-modal';
import ListSearch from '../ListSearch/ListSearch';

Modal.setAppElement('#root')

class ListChat extends React.Component {
	static propTypes = {
		listFriends: PropTypes.array,
		listGroup: PropTypes.array,
		listAvatar: PropTypes.array,
	};

	constructor(props) {
		super(props);
		this.state = {
			search: "",
			findByFullName: [],
			modalIsOpen: false
		}
	}

	openModal = () => {
		this.setState({modalIsOpen: true});
	};

	closeModal = () => {
		this.setState({modalIsOpen: false, search: "", findByFullName: []});
	};

	handleChangeSearch = (event) => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	};

	handleEnterPressSearch = (event) => {
		const {search} = this.state;
		if (event.charCode === 13) {
			if (search.length === 0) {
				this.setState({findByFullName: []});
			}
			if (search.length > 0) {
				this.setState({modalIsOpen: true});
				getSearchFriend(search)
					.then(data => {
						this.setState({findByFullName: data})
					})
					.catch(err => {
							console.log(err)
						}
					);
			}
		}
	};

	render() {
		const {user, listFriends, listGroup, pickedContact, onPickContact} = this.props;
		const {findByFullName, search} = this.state;
		return (
			<div className="left-column">
				<div className="card-header-container">
					<div className={`card-header`}>
						<div
							className={'listChat-profile'}
							onClick={this.props.toggleProfileModal}
						>
							<Contact
								avatarUrl={user.avatarUrl}
								name={user.fullName}
								size={'medium-contact'}
								textColor={'white-text'}
							/>
						</div>
						<div className={"card-button"}>
							<Notication
								counter={1}
								showModal={this.props.toggleNotificationModal}
							/>
							&nbsp; &nbsp; &nbsp;
							<Button
								onClick={() => {
								}}
								title={'+'}
								themeColor={'invisible-header'}
								// size={'mini'}
							/>
						</div>
					</div>

					<div className={"card-input"}>
						<Search
							position="searchLeft"
							imgName={imgSearch}
							placeholder="Tìm kiếm bạn bè"
							className="inputSearch"
							value={this.state.search}
							name="search"
							onChange={this.handleChangeSearch}
							onKeyPress={this.handleEnterPressSearch}
						/>
					</div>
				</div>
				<div className={`card-body `}>
					<div className={`type1`}>
						<ContactType
							type="Nhóm"
							available={listGroup.length}
						/>
						<div className="line"></div>
						<div className={`card-body1 scrollbar`}>
							{listGroup && listGroup.map(function (value, index) {
								const avatar = value.avatarUrl || defaultAvatar;
								const isPicked = value._id === pickedContact._id;

								return (
									<div
										key={index}
										className={`contact-container ${isPicked && 'contact-focus'}`}
										onClick={() => onPickContact(value, 'Group')}
									>
										<Contact
											name={value.name}
											avatarUrl={avatar}
											size={"small-contact"}
											textColor={"white-text"}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className={`card-body`}>
					<div className={`type2`}>
						<ContactType
							type="Bạn bè"
							available={listFriends.length}
						/>
						<div className="line"></div>
					</div>

					<div className={`card-body2 scrollbar`}>
						{listFriends && listFriends.map(function (value, index) {
							const avatar = value.avatarUrl || defaultAvatar;
							const isPicked = value._id === pickedContact._id;

							return (
								<div
									key={index}
									className={`contact-container ${isPicked && 'contact-focus'}`}
									onClick={() => onPickContact(value, 'User')}
								>
									<Contact
										name={value.fullName}
										avatarUrl={avatar}
										size={"small-contact"}
										textColor={"white-text"}
									/>
								</div>
							);
						})}
					</div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					contentLabel="Search Modal"
					className="Modal"
					overlayClassName="Overlay"
				>
					<ListSearch
						listSearch={findByFullName}
						keyword={search}
						onClickCloseModal={this.closeModal}
					/>
				</Modal>
			</div>
		);
	}
}

export default ListChat;
