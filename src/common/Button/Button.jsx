import './Button.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { buttonTypes } from '../../constants';

const Button = ({
	buttonType = buttonTypes.BUTTON,
	buttonText,
	className,
	url,
	onClick = () => {},
}) => {
	switch (buttonType) {
		case buttonTypes.BUTTON:
		case buttonTypes.SUBMIT:
			return (
				<button
					type={buttonType}
					className={'generic-button ' + className}
					onClick={onClick}
				>
					{buttonText}
				</button>
			);
		case buttonTypes.LINK:
			return (
				<Link to={url} className={'generic-button ' + className}>
					{buttonText}
				</Link>
			);
		default:
			break;
	}
};

Button.propTypes = {
	buttonType: PropTypes.oneOf(Object.values(buttonTypes)),
	buttonText: PropTypes.string.isRequired,
	className: PropTypes.string,
	url: PropTypes.string,
};

export default Button;
