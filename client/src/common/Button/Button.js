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
            'maroon-primary',
            'invisible-header',
        ]).isRequired,
        size: PropTypes.oneOf([
            'mini',
            'large',
            'none'
        ]),
        imageUrl: PropTypes.string,
        color: PropTypes.string,
    };

    static defaultProps = {
        themeColor: 'purple-primary',
        size: 'none',
        title: '',
        onClick: () => {},
	};

    constructor(props){
        super(props);
    }

    render(){
        if(this.props.imageUrl) {
            return(
                <div>
                    <button
                        className={`button ${this.props.themeColor} ${this.props.size}`}
                        onClick={this.props.onClick}

                    >
                        <img
                        className={"image"}
                        src={this.props.imageUrl}
                        />
                        {this.props.title}
                    </button>


                </div>
            )
        } else return (
                <div>
                    <button
                        className={`button ${this.props.themeColor} ${this.props.size}`}
                        onClick={this.props.onClick}
                    >
                        {this.props.title}
                    </button>
                </div>
        )
    }
}

export default Button;
