import './Input.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { generateId } from '../../helpers/uuid';
import { inputTypes } from '../../constants';

const Input = ({
	labelText,
	placeholderText,
	inputType = inputTypes.INPUT,
	className,
	value,
	onChange = () => {},
}) => {
	const id = generateId();
	return (
		<div className={clsx('generic-input', className)}>
			{labelText && <label htmlFor={id}>{labelText}</label>}
			{inputType === 'textarea' && (
				<textarea
					id={id}
					placeholder={placeholderText}
					onChange={onChange}
					value={value}
				/>
			)}
			{inputType !== 'textarea' && (
				<input
					id={id}
					placeholder={placeholderText}
					type={inputType}
					onChange={onChange}
					value={value}
				/>
			)}
		</div>
	);
};

Input.propTypes = {
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	inputType: PropTypes.oneOf(Object.values(inputTypes)),
	className: PropTypes.string,
};

export default Input;
