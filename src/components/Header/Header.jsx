import './Header.css';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = ({ user }) => (
	<header className='header'>
		<Logo />
		<div className='header__right-pane'>
			<div className='username'>{user}</div>
			<Button buttonText='Logout' className='header__logout-button' />
		</div>
	</header>
);

export default Header;
