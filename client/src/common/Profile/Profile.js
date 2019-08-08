import React, {Component} from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Contact from "../Contact/Contact";

export default class Profile extends Component {
	static propTypes = {
		avatarUrl: PropTypes.string,
		name: PropTypes.string,
		fullName: PropTypes.string,
		birthDate: PropTypes,
		gender: PropTypes.string,
		email: PropTypes.string,
		userName: PropTypes.string,
		thaydoiten: PropTypes.any,
		thaydoingaysinh: PropTypes.any
	};

	static defaultProps = {
		avatarUrl: 'https://placekitten.com/g/64/64'
	};

	render() {
		return (
			<div className={'formsize'}>
				<div className={'cssProfile'}>
					<Contact
						avatarUrl={this.props.avatarUrl}
						size={"large-contact"}
					/>
				</div>
				<div className={'changeavatar'}>
					Đổi ảnh đại diện
				</div>
				<div className='chinhsua'>
					<label className="title black-title"> Tên đăng nhập </label>
					<div className="inputLable">
						<input className="input small-input" value={this.props.userName} disabled/>
					</div>
					<Input
						onChange={this.props.thaydoiten}
						value={this.props.fullName}
						inputSize='small-input'
						title='Họ và tên'
					/>
					<label> Giới tính </label> <br/>
					<div className={'canradio'}>
						<Input type='radio' checked
						/>
						{this.props.gender === 'Nam' ? 'Nam' : 'Nữ'}
					</div>
					<Input
						onChange={this.props.thaydoingaysinh}
						type='date'
						inputSize='small-input'
						title='Ngày sinh'
						value={this.props.birthDate}
					/>
					<label className="title black-title"> Email </label>
					<div className="inputLable">
						<input className="input small-input" value={this.props.email} disabled/>
					</div>
				</div>
			</div>
		)
	}
}
