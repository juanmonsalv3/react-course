import './Input.css';
import PropTypes from 'prop-types';
import { generateId } from '../../helpers/uuid';
import { inputTypes } from '../../constants';

const Input = ({
	labelText,
	placeholderText,
	inputType = inputTypes.INPUT,
	className = 'generic-input',
	onChange = () => {},
}) => {
	const id = generateId();
	return (
		<div className={className}>
			{labelText && <label htmlFor={id}>{labelText}</label>}
			{inputType === 'textarea' && (
				<textarea
					id={id}
					placeholder={placeholderText}
					onChange={onChange}
				></textarea>
			)}
			{inputType !== 'textarea' && (
				<input
					id={id}
					placeholder={placeholderText}
					type={inputType}
					onChange={onChange}
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
