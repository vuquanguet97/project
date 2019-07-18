import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./Button.css";

class Button extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        themeColor: PropTypes.oneOf([
            'purple-primary',
            'purple-secondary',
            'grey-primary',
            'maroon-primary'
        ]).isRequired,
    };

    constructor(props){
        super(props);
    }

    render(){

        return(
            <div>
                <button
                    className={`button ${this.props.themeColor}`}
                    onClick={this.props.onClick}
                    >
                    {this.props.title}
                </button>
            </div>
        )
    }
}

export default Button;
