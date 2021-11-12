import { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { loadUser, userVerify, googleAuthenticate } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/navbar';
import queryString from 'query-string';

const Layout = (props) => {
	let location = useLocation();
	const dispatch = useDispatch();
	const { pathname } = location;
	const values = queryString.parse(location.search);
	const state = values.state ? values.state : null;
	const code = values.code ? values.code : null;

	if (state && code) {
		dispatch(googleAuthenticate(state, code));
	} else {
		// useEffect(() => {
		if (localStorage.getItem('access_token')) {
			dispatch(userVerify());
			dispatch(loadUser());
		} else {
			if (!pathname.includes('password')) {
				return <Redirect to='/login' />;
			}
			// props.history.push('/login');
		}
		console.log(location);
		// }, [location]);
	}
	console.log('Layout');
	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
};

export default Layout;
