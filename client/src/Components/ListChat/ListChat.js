import React from 'react';
import Contact from '../../common/Contact/Contact';
import ContactType from '../../common/ContactType/ContactType';
import './Listchat.css';
import Input from '../../common/Input/Input';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import Notication from './Notication';

class ListChat extends React.Component {
	static propTypes = {
		listContact: PropTypes.array,
		listGroup: PropTypes.array,
		listAvatar: PropTypes.array,
	};

	render() {

		return (
			<div className="left-column">
				<div className={`card-header`}>
					<Contact
						avatarUrl={this.props.user.avatarUrl}
						name={this.props.user.name}
						size={'medium-contact'}
						textColor={'white-text'}
					/>
					<div className={"card-button"}>
						<Notication counter={1}
						/>
						&nbsp; &nbsp; &nbsp;
						<Button
							onClick={() => {
							}}
							title={'+'}
							themeColor={'purple-header'}
							// size={'mini'}
						/>
					</div>

				</div>
				<div className={"card-input"}>
					<Input
						value={this.props.value}
						placeholder={"Search"}
						onChange={(e) => this.setState({text: e.target.text})}
						inputSize={"small-input"}
						showTitle={false}
					/>

				</div>
				<div className={`card-body `}>
					<div className={`type1`}>
						<ContactType
							type="Group"
							available={3}
						/>
						<div className="test"></div>
						<div className={`card-body1 scrollbar`}>
							{this.props.listGroup && this.props.listGroup.map(function (value, index) {
								return (
									<Contact
										key={index}
										name={value.name}
										avatarUrl={value.avatarUrl}
										size={"small-contact"}
										textColor={"white-text"}
									/>
								);
							})}
						</div>
					</div>
				</div>

				<div className={`card-body`}>
					<div className={`type2`}>
						<ContactType
							type="Friend"
							available={1}
						/>
						<div className="test"></div>
					</div>

					<div className={`card-body2 scrollbar`}>
						{this.props.listContact && this.props.listContact.map(function (value, index) {
							return (
								<Contact
									key={index}
									name={value.name}
									avatarUrl={value.avatarUrl}
									size={"small-contact"}
									textColor={"white-text"}
								/>);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default ListChat;
