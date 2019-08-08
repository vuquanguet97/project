import React from 'react';
import './Contact.css';
import PropTypes from 'prop-types';

export default class Contact extends React.Component {
	static propTypes = {
		avatarUrl: PropTypes.string,
		name: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string,
		]),
		fullName : PropTypes.string,
		showName: PropTypes.bool,
		size: PropTypes.oneOf(['small-contact', 'medium-contact', 'large-contact']),
		textColor: PropTypes.oneOf(['white-text', 'black-text']),
		showModal : PropTypes.any,
	};

	static defaultProps = {
		showName: true,
		size: 'medium-contact',
		textColor: 'black-text',
	};

	render() {
		return (
	<div>

	      <div className={`parent ${this.props.textColor}`}>
			<img
				onClick = {this.props.showModal}
				className={this.props.size}
				src={this.props.avatarUrl}
				alt={this.props.name}
			/>
			{this.props.showName && <span className={'red-text'}>{this.props.name}</span>}
			</div>
		</div>
		)
	}
}
