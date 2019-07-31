import React from 'react';
import InputRegister from '../Components/InputRegister/InputRegister';
import {registerUser} from "../services";


function capitalizeEachWord(fullName) {
	const splitFullName = fullName.split(" ");
	var capitalizeFullName = "";
	for (let i = 0; i < splitFullName.length; i++) {
		capitalizeFullName += splitFullName[i].charAt(0).toUpperCase() + splitFullName[i].slice(1) + " ";
	}
	capitalizeFullName = capitalizeFullName.trim();
	return capitalizeFullName;
}

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			fullName: "",
			password: "",
			email: "",
			gender: "",
			formErrors:
				{
					username: "",
					email: "",
					password: "",
					checkpassword: ""
				},
			emailValid: false,
			passwordValid: false,
			checkpasswordValid: false,
			formValid: false,
			usernameValid: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.validateFeild = this.validateFeild.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value}, () => {
			this.validateFeild(name, value)
		});
	}

	validateFeild(name, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailValid = this.state.emailValid;
		let passwordValid = this.state.passwordValid;
		let checkpasswordValid = this.state.checkpasswordValid;
		let usernameValid = this.state.usernameValid;
		let numbers = /[0-9]/g;
		let lowerCaseLetters = /[a-z]/g;
		switch (name) {
			case 'username':
				usernameValid = value.length >= 4;
				fieldValidationErrors.username = usernameValid ? '' : ' Tên tài khoản ít nhất 4 ký tự';
				break;
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' Email không hợp lệ';
				break;
			case 'password':
				passwordValid = value.length >= 6 && value.match(numbers) && value.match(lowerCaseLetters)
				fieldValidationErrors.password = passwordValid ? '' : 'Mật khẩu ít nhất 6 ký tự và chứa số';
				break;
			case 'checkpassword':
				if (value === this.state.password) {
					checkpasswordValid = true;
					fieldValidationErrors.checkpassword = '';
				} else {
					checkpasswordValid = false;
					fieldValidationErrors.checkpassword = 'Mật khẩu nhập lại không đúng';
				}
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			emailValid: emailValid,
			passwordValid: passwordValid,
			checkpasswordValid: checkpasswordValid,
			usernameValid: usernameValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({formValid: this.state.emailValid && this.state.passwordValid});
	}

	handleSubmit(event) {
		event.preventDefault();
		const {
			username,
			fullName,
			password,
			email,
			gender
		} = this.state;

		const fullNamAfterEdit = capitalizeEachWord(fullName);

		const user = { username, fullName: fullNamAfterEdit, password, email, gender };

		registerUser(user)
			.then(data => {
				this.props.history.push('/login')
			})
			.catch(data => {
				console.log(data);
			});
	}

	render() {

		const {
			username, fullName, password, email,
			gender, formErrors, emailValid, passwordValid,
			checkpasswordValid, formValid, usernameValid
		} = this.state

		return (
			<div>
				<InputRegister
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					username={username}
					fullName={fullName}
					password={password}
					email={email}
					gender={gender}
					formErrors={formErrors}
					emailValid={emailValid}
					passwordValid={passwordValid}
					checkpasswordValid={checkpasswordValid}
					formValid={formValid}
					usernameValid={usernameValid}
				/>
			</div>
		);
	}
}

export default Register;
