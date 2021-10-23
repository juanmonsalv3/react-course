import './Input.css';
import { generateId } from '../../helpers/uuid';

const Input = ({
	labelText,
	placeholderText,
	inputType = 'text',
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

export default Input;
