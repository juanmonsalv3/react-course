import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

import './Header.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = ({ userInfo, authToken, onLogout }) => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		if (!authToken && location.pathname !== '/login') {
			history.push('/login');
		} else if (location.pathname === '/' && authToken) {
			history.push('/courses');
		}
	}, [authToken, location, history]);

	return (
		<header className='header'>
			<Logo />
			{userInfo && (
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
