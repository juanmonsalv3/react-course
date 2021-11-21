import './Header.css';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import {
	selectAuthToken,
	selectIsAuthenticated,
	selectUser,
} from '../../store/user/selectors';
import { getUserInfoThunk, logoutUserThunk } from '../../store/user/thunks';

const Header = () => {
	const userInfo = useSelector(selectUser);
	const authToken = useSelector(selectAuthToken);
	const isAuth = useSelector(selectIsAuthenticated);
	const dispatch = useDispatch();

	useEffect(() => {
		if (authToken && !isAuth) {
			dispatch(getUserInfoThunk());
		}
	}, [dispatch, authToken, isAuth]);

	const onLogout = () => {
		dispatch(logoutUserThunk());
	};

	if (!isAuth) {
		return <></>;
	}

	return (
		<header className='header' data-testid='header'>
			<Logo />
			{userInfo.isAuth && (
				<div className='header__right-pane'>
					<div className='username' data-testid='username'>
						{userInfo.name}
					</div>
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
