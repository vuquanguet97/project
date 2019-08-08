import React from 'react';
import './InputRegister.css';
import Background from '../Background';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import FormErrors from '../../common/FormErrors/FormErrors';
import Logo from '../Logo/Logo';
import {Link} from "react-router-dom";
import Alert from '../Alert/Alert';

function InputRegister(props){
    return(
    <section>
        <Background/>
        <div className="formRegister">
        <div className={`left`}>
            <Logo
                logoPosition="logoRegister"
                slogan="sloganRegister"
            />
        </div>
        <div className="right">
            <form onSubmit={props.handleSubmit}>
                <div className="divInputRegister">
                    <div>
                        <Input
                            inputSize="small-input"
                            titleColor="black-title"
                            title="Tên đăng nhập"
                            value={props.username}
                            showTitle={true} type="text"
                            name="username"
                            onChange={props.handleChange}/>
                        <FormErrors className="formErrors" type={props.formErrors.username} />
                    </div>
                    <div>
                        <Input
                            inputSize="small-input"
                            titleColor="black-title"
                            title="Họ và tên"
                            value={props.fullName}
                            showTitle={true} type="text"
                            name="fullName"
                            onChange={props.handleChange}/>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="gender"
                            value="Nam"
                            onChange={props.handleChange}
                            />
                            <label>Nam</label>
                        <input
                            type="radio"
                            name="gender"
                            value="Nữ"
                            onChange={props.handleChange}
                            />
                            <label>Nữ</label>
                    </div>
                    <div>
                        <Input
                            inputSize="small-input"
                            titleColor="black-title"
                            title="Mật khẩu"
                            value={props.password}
                            type="password"
                            name="password"
                            onChange={props.handleChange}/>
                        <FormErrors className="formErrors" type={props.formErrors.password} />
                    </div>
                    <div>
                        <Input
                            inputSize="small-input"
                            titleColor="black-title"
                            title="Nhập lại mật khẩu"
                            type="password"
                            name="checkpassword"
                            onChange={props.handleChange}
                        />
                        <FormErrors className="formErrors" type={props.formErrors.checkpassword} />
                    </div>
                    <div>
                        <Input
                            inputSize="small-input"
                            titleColor="black-title"
                            title="Email" type="text"
                            name="email"
                            value={props.email}
                            onChange={props.handleChange}/>
                        <FormErrors className="formErrors" type={props.formErrors.email} />
                    </div>
                    <div className="divButton">
                        <Button 
                            title="ĐĂNG KÝ" 
                            size="large" 
                            themeColor="purple-primary" 
                            onClick={props.handleClickAlert}
                            checkValid={props.formValid}
                            />
                    </div>
                </div>
            </form>
            <div className="redirectParent">
                <p className="redirect">
                    Đã có tài khoản? <Link to={'/login'}>Đăng nhập</Link>
                </p>
            </div>
        </div>
    </div>
    <Alert 
            statusBoxColor={props.statusBoxColor}
            statusDisplay={props.statusDisplay}
            statusImage={props.statusImage}
        />
    </section>       
    );
}
export default InputRegister;
