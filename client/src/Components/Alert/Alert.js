import React from 'react';
import './Alert.css';

function Alert(props){
    return(
            <span className={`${props.statusBoxColor}`}>
                <p>{props.statusDisplay}</p>
                <img className="imageStatus" src={props.statusImage} alt="" />
            </span>
        );
    }

export default Alert;