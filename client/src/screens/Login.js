import React from 'react';
import InputLogin from '../Components/InputLogin/InputLogin';
import {loginUser} from "../services";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			formErrors: {
				username: "",
				password: ""
			},
			usernameValid: false,
			passwordValid: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value}, () => {
			this.validateFeild(name, value)
		});

	}

	validateFeild(name, value) {
		let fieldValidationErrors = this.state.formErrors;
		let passwordValid = this.state.passwordValid;
		let usernameValid = this.state.usernameValid;
		let numbers = /[0-9]/g;
		let lowerCaseLetters = /[a-z]/g;
		switch (name) {
			case 'password':
				passwordValid = value.length >= 6 && value.match(numbers) && value.match(lowerCaseLetters);
				fieldValidationErrors.password = passwordValid ? '' : '*Mật khẩu ít nhất 6 ký tự và chứa số';
				break;
			case 'username':
				usernameValid = value.length >= 4;
				fieldValidationErrors.username = usernameValid ? '' : '*Tên tài khoản ít nhất 4 ký tự';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			passwordValid: passwordValid,
			usernameValid: usernameValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
	}

	handleSubmit(event) {
		event.preventDefault();
		const {username, password} = this.state;

		const userData = {
			email: username,
			password,
		};

		loginUser(userData)
			.then(({ userID }) => {
				localStorage.setItem('userID', userID);
				this.props.history.push(`/home`)
			})
			.catch(data => {
				console.log(data);
			});
	}

	render() {
		const {username, password, formErrors} = this.state;
		return (
			<InputLogin
				handleSubmit={this.handleSubmit}
				handleChange={this.handleChange}
				username={username}
				formErrors={formErrors}
				password={password}
			/>
		);
	}
}

export default Login;
