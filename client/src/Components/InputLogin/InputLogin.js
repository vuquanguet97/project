import React from 'react';
import './InputLogin.css';
import {Link} from "react-router-dom";
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import FormErrors from '../../common/FormErrors/FormErrors';
import Logo from '../Logo/Logo';
import Alert from '../Alert/Alert';
function InputLogin(props){
    return(
    <div className="background">
        <div className="formLogin">
        <form onSubmit={props.handleSubmit}>
            <Logo
                logoPosition="logoLogin"
                slogan="sloganLogin"
            />
            <div className="divInput">
                <div>
                    <Input
                        value={props.username}
                        placeholder="Tên đăng nhập"
                        type="text"
                        name="username"
                        onChange={props.handleChange}
                    />
                    <FormErrors type={props.formErrors.username}/>
                </div>
                <div>
                    <Input
                        value={props.password}
                        placeholder="Mật khẩu"
                        type="password"
                        name="password"
                        onChange={props.handleChange}
                    />
                    <FormErrors type={props.formErrors.password}/>
                </div>
            </div>
            <div className="buttonLogin">
                <Button
                    themeColor="purple-primary"
                    title="ĐĂNG NHẬP"
                    size="large"
                    checkValid={props.formValid}
                    onClick={props.handleClickAlert}
                />
            </div>
        </form>
        <div className="registerParent">
            <p className="register">
                Chưa có tài khoản? <Link to={'/register'}>Đăng ký</Link>
            </p>
        </div>
    </div>
    <Alert 
            statusBoxColor={props.statusBoxColor}
            statusDisplay={props.statusDisplay}
            statusImage={props.statusImage}
    />
    </div>
    );

}

export default InputLogin;
