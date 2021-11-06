import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectIsAuthenticated } from '../store/user/selectors';

const loginRequired = (Component) => (props) => {
	const isAuth = useSelector(selectIsAuthenticated);
	if (isAuth === false) {
		return <Redirect to='login' />;
	}
	return <Component {...props} />;
};

export default loginRequired;
