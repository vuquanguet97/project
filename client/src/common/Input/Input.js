import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

class Input extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		titleColor: PropTypes.string,
		value: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		type: PropTypes.string,
		rightIcon: PropTypes.any,
		leftIcon: PropTypes.any,
		showTitle: PropTypes.bool,
		name: PropTypes.string,
		inputSize: PropTypes.oneOf([
			'small-input',
			'big-input'
		]),
		checked: PropTypes.bool,
	};

	static defaultProps = {
		type: 'text',
		showTitle: true,
		titleColor: 'black-title',
		inputSize: 'big-input',
		checked: false,
	};

	render() {
		const {
			rightIcon,
			leftIcon,
			name,
			type,
			checked,
			inputSize,
			onChange,
			placeholder,
			showTitle,
			title,
			titleColor,
			value,
			onSubmit,
			onClick
		} = this.props;
		const paddingLeft = leftIcon ? 'show-icon-left' : '';
		const paddingRight = rightIcon ? 'show-icon-right' : '';

		return (
			<div>
				{showTitle && (
					<div className={`title ${titleColor}`}>
						<label>{title}</label>
					</div>
				)}
				<div className='inputLable'>

					<input
						type={type}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
						className={`input ${paddingLeft} ${paddingRight} ${inputSize}`}
						name={name}
						onSubmit={onSubmit}
						checked={type === 'radio' && checked}
					/>
					{!!rightIcon &&
					<img
						onClick={onClick}
						className="image-right"
						alt="icon-send"
						src={rightIcon}
					/>

					}

					{!!leftIcon &&
					<img
						className="image-left"
						alt="icon"
						src={leftIcon}
					/>
					}
				</div>
			</div>
		);
	}
}

export default Input;
