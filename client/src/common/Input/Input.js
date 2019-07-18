import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

class Input extends React.Component{
    static propTypes = {
        title: PropTypes.string,
        titleColor: PropTypes.string,
        value: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.oneOf(['text', 'password']),
        rightIcon: PropTypes.any,
        leftIcon: PropTypes.any,
        showTitle: PropTypes.bool,
        showIconLeft: PropTypes.bool,
        showIconRight: PropTypes.bool,
    };

    static defaultProps = {
        type: 'text',
        showTitle: true,
        titleColor: 'black-title',
        showIconLeft:false,
        showIconRight:false,
    };

    render(){
        const paddingLeft = this.props.showIconLeft ? 'show-icon-left' : '';
        const paddingRight = this.props.showIconRight ? 'show-icon-right':'';

        return(
            <div className='inputLable'>
                <div className={`title ${this.props.titleColor}`}>
                     {this.props.showTitle && <label>{this.props.title}</label>}
                </div>

                <input type ={this.props.type}
                    onChange = {this.props.onChange}
                    value = {this.props.value}
                    placeholder ={this.props.placeholder}
                    className={`input ${paddingLeft} ${paddingRight}`}
                    />
                    {this.props.showIconRight &&
                        <img
                            className="image-right"
                            alt="icon-send"
                            src={this.props.rightIcon}
                        />
                    }
                        {this.props.showIconLeft &&
                            <img className="image-left"
                            alt="icon"
                            src={this.props.leftIcon}
                            />
                    }

            </div>
        );
    }
}

export default Input;
