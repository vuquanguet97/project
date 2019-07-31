import React from 'react';
import logo from '../../assets/logo.png';
import './Logo.css';
function Logo(props){ 
    return(
    <div>
        <img
            className={props.logoPosition}
            src={logo}
            alt="logo"
        />
        <p className={props.slogan}>Chat đi chờ chi!</p>
    </div>
    );
}
export default Logo;