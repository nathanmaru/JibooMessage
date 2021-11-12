import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ path, component: Component }) => {
	if (!localStorage.getItem('access_token') || !localStorage.getItem('refresh_token'))
		return <Redirect to='/login' />;
	console.log('hello');

	return (
		<Route
			path={path}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
	);
};

export default ProtectedRoute;
