import React, {Component} from 'react';
import './ContactType.css';
import PropTypes from 'prop-types';

export default class ContactType extends Component {
	static propTypes = {
		type: PropTypes.string,
		available: PropTypes.number,
	};

	render() {
		return (
			<div>
				<div className='setup'>
					{this.props.type}({this.props.available})
				</div>
			</div>
		)
	}
}
