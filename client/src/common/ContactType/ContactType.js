import React, {Component} from 'react';
import './ContactType.css';
import PropTypes from 'prop-types';

export default class ContactType extends Component {
	static propTypes = {
		type: PropTypes.string,
		available: PropTypes.number,
	};

	render() {
		const { type, available } = this.props;

		return (
			<div>
				<div className='setup'>
					{type} ({available})
				</div>
			</div>
		)
	}
}
