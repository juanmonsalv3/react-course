import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROLES } from '../../constants';
import { selectUser } from '../../store/user/selectors';

const PrivateRoute = ({ component: Component, ...otherProps }) => {
	const userInfo = useSelector(selectUser);

	return (
		<Route
			{...otherProps}
			render={(props) =>
				userInfo.role === ROLES.ADMIN ? (
					<Redirect to='/courses' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
