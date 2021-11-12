import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Logout = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	useEffect(() => {
		dispatch(logout());
	}, []);
	useEffect(() => {
		if (!isAuthenticated) {
			history.push('/login');
		}
	}, [isAuthenticated]);
	return null;
};

export default Logout;
