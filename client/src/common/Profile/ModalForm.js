import React, {Component} from "react";
import './ModalForm.css';
import './Profile.css';
import '../Contact/Contact.css';
import Profile from './Profile';
import Button from '../Button/Button';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import {getUserInfo, editUserInfo, changePassword} from './../../services';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import defaultAvatar from '../../assets/male-avatar.png';

export default class ModalForm extends Component {
	userID = localStorage.getItem('userID');

	state = {
		show: false,
		isDisplay: true,
		isDisplay1: true,
		showName: true
	};

	static propTypes = {
		avatarUrl: PropTypes.string,
		fullName: PropTypes.string,
		fullName1: PropTypes.string,
		birthDate: PropTypes.instanceOf(Date),
		gender: PropTypes.string,
		email: PropTypes.string,
		userName: PropTypes.string,
		showName: PropTypes.bool,
		textColor: PropTypes.string
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.showModal) {
			getUserInfo(this.userID)
				.then(data => {
					this.setState({
						fullName: data.fullName,
						gender: data.gender,
						userName: data.username,
						email: data.email,
						birthDate: data.birthDate ? new Date(data.birthDate).toISOString().substr(0, 10) : 0,
						avatarUrl: data.avatarUrl || defaultAvatar,
					});
				})
				.catch(e => {
					console.log(e)
				})
		}
	}

	handleChangepassword = () => {
		changePassword(this.userID, {
			checkPassword: this.state.oldPass,
			newPassword: this.state.newPass
		})
			.then(data => {
				console.log(data)
			})
			.catch(e => {
				console.log(e);
			})
	};

	hideModal = () => {
		this.setState({show: false});
	};


	thaydoiten = (event) => {
		this.setState({
			fullName: event.target.value
		});
	};

	thaydoingaysinh = (event) => {
		this.setState({
			birthDate: event.target.value
		});
	};

	gioitinh = (event) => {
		this.setState({
			gender: event.target.value
		});
	};

	newPassword = (event) => {
		this.setState({
			newPass: event.target.value
		});
	};

	oldPassword = (event) => {
		this.setState({
			oldPass: event.target.value
		});
	};

	handleUpdatebutton = () => {
		editUserInfo(this.userID, {
			fullName: this.state.fullName,
			birthDate: this.state.birthDate,
		})
			.then(data => {
				console.log(data)
			})
			.catch(e => {
				console.log(e);
			})
	};

	render() {
		var {isDisplay, isDisplay1} = this.state;
		var hienthiupdate = isDisplay ? <div>
				<Profile
					avatarUrl={this.state.avatarUrl}
					gioitinh={this.gioitinh}
					thaydoiten={this.thaydoiten}
					thaydoingaysinh={this.thaydoingaysinh}
					fullName={this.state.fullName}
					gender={this.state.gender}
					birthDate={this.state.birthDate}
					userName={this.state.userName}
					email={this.state.email}
				/>
				<div className={'fixbutton'}>
					<Button
						onClick={this.handleUpdatebutton}
						size='mini'
						title='LƯU'
						themeColor='purple-primary'
					/>
					<Button
						onClick={this.props.toggleModal}
						size='mini'
						title='HỦY'
						themeColor='maroon-primary'/>
				</div>
			</div>

			: '';

		var hienthiupdate1 = isDisplay1 ?
			<div>
				<div className={'formsize1'}>
					<Input
						title='Nhập mật khẩu cũ'
						type='password'
						onChange={this.oldPassword}
						value={this.state.oldPass}
					/>
					<Input
						title='Nhập mật khẩu mới'
						type='password'
						onChange={this.newPassword}
						value={this.state.newPass}
					/>
					<div className={'fixbutton1'}>
						<Button
							onClick={this.handleChangepassword}
							size='mini'
							title='LƯU'
							themeColor='purple-primary'
						/>
						<Button
							onClick={this.hideModal}
							size='mini'
							title='HỦY'
							themeColor='maroon-primary'/>
					</div>
				</div>

			</div>
			: '';
		return (
			<div>
				<Modal show={this.props.showModal} handleClose={this.props.toggleModal}>
					<Tabs>
						<TabList>
							<Tab>Thông tin cá nhân</Tab>
							<Tab>Đổi mật khẩu</Tab>
						</TabList>

						<TabPanel>
							{hienthiupdate}
						</TabPanel>
						<TabPanel>
							{hienthiupdate1}
						</TabPanel>
					</Tabs>


				</Modal>
			</div>
		)
	}
}

const Modal = ({handleClose, show, children}) => {
	const showHideClassName = show ? 'modal display-block' : 'modal display-none';
	return (
		<div className={showHideClassName}>
			<section className='modal-main'>
				{children}
			</section>
		</div>
	);
};
