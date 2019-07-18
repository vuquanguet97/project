import React from 'react';
import './Contact.css';
import PropTypes from 'prop-types';

export default class Contact extends React.Component {
	static propTypes = {
		avatarUrl: PropTypes.string,
		name: PropTypes.string,
		showName: PropTypes.bool,
		size: PropTypes.oneOf(['small', 'medium', 'large']),
	};

	static defaultProps = {
		showName: true,
		size: 'medium'
	};


 render() {

		return (

	      <div className='parent'>
	        <img
	          className={this.props.size}
	          src={this.props.avatarUrl}
	          alt={this.props.name}

	        />
			{this.props.showName && <span className={'red-text'}>{this.props.name}</span>}

			</div>


		)
	}
}
