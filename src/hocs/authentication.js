import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../store/authSlice';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Authentication = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	let location = useLocation();
	const [verify, setVerify] = useState();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (localStorage.getItem('access_token') == undefined) {
			alert('Undefined access token');
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
		}
		if (!localStorage.getItem('access_token') || !localStorage.getItem('refresh_token')) {
			history.push('/login');
		} else {
			dispatch(loadUser());
		}
	}, [location]);

	useEffect(() => {
		if (user) {
			setVerify(user.is_verified);
		}
	}, [user]);

	return (
		<>
			{props.children}
			{verify ? null : (
				<div class='flex  sticky bottom-2 p-6 w-screen justify-end'>
					<Alert severity='warning'>
						<AlertTitle>Warning</AlertTitle>
						This is account is still not verified. —{' '}
						<strong>check out your email now!</strong>
					</Alert>
				</div>
			)}
		</>
	);
};

export default Authentication;
