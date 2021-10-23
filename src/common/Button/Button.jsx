import './Button.css';

const Button = ({
	buttonType = 'button',
	buttonText,
	className,
	onClick = () => {},
}) => (
	<button type={buttonType} className={className} onClick={onClick}>
		{buttonText}
	</button>
);

export default Button;
