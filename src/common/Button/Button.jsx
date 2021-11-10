import './Button.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { buttonTypes } from '../../constants';

const Button = ({
	buttonType = buttonTypes.BUTTON,
	buttonText,
	className,
	children,
	url,
	onClick = () => {},
}) => {
	const classNames = clsx('generic-button', className);
	switch (buttonType) {
		case buttonTypes.BUTTON:
		case buttonTypes.SUBMIT:
			return (
				<button type={buttonType} className={classNames} onClick={onClick}>
					{buttonText}
					{children}
				</button>
			);
		case buttonTypes.LINK:
			return (
				<Link to={url} className={classNames}>
					{buttonText}
					{children}
				</Link>
			);
		default:
			break;
	}
};

Button.propTypes = {
	buttonType: PropTypes.oneOf(Object.values(buttonTypes)),
	buttonText: PropTypes.string,
	className: PropTypes.string,
	url: PropTypes.string,
};

export default Button;
