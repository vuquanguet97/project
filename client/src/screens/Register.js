import React from 'react';
import InputRegister from '../Components/InputRegister/InputRegister';
import firework from '../assets/firework.png';
import errorImage from '../assets/error.png';
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

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
			fullName: "",
			password: "",
			email: "",
            gender: "",
            checkpassword: "",
            statusBoxColor: "",
            statusDisplay: "",
            statusImage: "",
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
    validateFeild(name, value){
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let checkpasswordValid = this.state.checkpasswordValid;
        let usernameValid = this.state.usernameValid;
        const {checkpassword} = this.state;
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
                passwordValid = value.length >= 6 &&  value.match(numbers) && value.match(lowerCaseLetters)
                fieldValidationErrors.password = passwordValid ? '': 'Mật khẩu ít nhất 6 ký tự và chứa số';
                if(value !== checkpassword && checkpassword === ""){
                    fieldValidationErrors.checkpassword =  "";
                } else if(value !== this.state.checkpassword && this.state.checkpassword !== ""){
                    fieldValidationErrors.checkpassword = "Mật khẩu nhập lại không đúng";
                }
                break;
            case 'checkpassword':
                if (value === this.state.password){
                    checkpasswordValid = true;
                    fieldValidationErrors.checkpassword = '';
                }
                else {
                    checkpasswordValid = false;
                    fieldValidationErrors.checkpassword = 'Mật khẩu nhập lại không đúng';
                }
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        checkpasswordValid: checkpasswordValid,
                        usernameValid: usernameValid
                        }, this.validateForm);
    }
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.checkpasswordValid});
      }

    handleSubmit(event) {
		event.preventDefault();
		const {
			username,
			fullName,
			password,
			email,
            gender,
		} = this.state;

		const fullNamAfterEdit = capitalizeEachWord(fullName);

		const user = { username, fullName: fullNamAfterEdit, password, email, gender };

        registerUser(user)
        .then(data => {
            if(data.code === 200){
                this.setState({
                  statusBoxColor: "success",
                  statusDisplay: "Đăng ký thành công!. Tự động chuyển hướng trong giây lát",
                  statusImage: firework
              });
            }
            setTimeout(()=>{this.props.history.push('/login')}, 3000);
        })
        .catch(err=>{
            if(err){
                this.setState({
                    statusBoxColor: "failed",
                    statusDisplay: "Vui lòng kiểm tra lại tên đăng nhập hoặc email",
                    statusImage: errorImage
                });
            }
        });
	}
    handleClickAlert = () =>{
        this.setState({statusBoxColor: "", statusDisplay: ""});
    }
    render(){
		const {
			username, fullName, password, email,
			gender, formErrors, emailValid, passwordValid,
            checkpasswordValid, formValid, usernameValid,
            statusBoxColor, statusDisplay, statusImage
		} = this.state
        return(
            <div>
                <InputRegister
                    handleSubmit = {this.handleSubmit}
                    handleChange = {this.handleChange}
                    username = {username}
                    fullName = {fullName}
                    password = {password}
                    email = {email}
                    gender = {gender}
                    formErrors = {formErrors}
                    emailValid = {emailValid}
                    passwordValid = {passwordValid}
                    checkpasswordValid = {checkpasswordValid}
                    formValid = {formValid}
                    usernameValid = {usernameValid}
                    statusBoxColor = {statusBoxColor}
                    statusDisplay = {statusDisplay}
                    statusImage = {statusImage}
                    handleClickAlert = {this.handleClickAlert}
                />
            </div>
        );
    }
}

export default Register;
