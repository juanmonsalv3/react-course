import PropTypes from 'prop-types';

import './Header.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/user/selectors';
import { userLoggedOut } from '../../store/user/actionCreators';

const Header = () => {
	const userInfo = useSelector(selectUser);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(userLoggedOut());
	};

	return (
		<header className='header'>
			<Logo />
			{userInfo.isAuth && (
				<div className='header__right-pane'>
					<div className='username'>{userInfo.name}</div>
					<Button
						buttonText='Logout'
						className='header__logout-button'
						onClick={onLogout}
					/>
				</div>
			)}
		</header>
	);
};

Header.propTypes = {
	userInfo: PropTypes.object,
	authToken: PropTypes.string,
	onLogout: PropTypes.func,
};

export default Header;
