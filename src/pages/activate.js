import { useLocation, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateEmail } from '../store/authSlice';
const Activate = ({ match }) => {
	const dispatch = useDispatch();
	const ui = match.params.uid;
	const token = match.params.token;
	console.log(ui, token);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = JSON.stringify({ uid: ui, token: token });
		console.log(data);
		dispatch(activateEmail({ uid: ui, token: token }));
	};
	const { isAuthenticated } = useSelector((state) => state.auth);
	useEffect(() => {
		if (isAuthenticated) {
			alert('Well done! You can now login to your account!');
			return <Redirect to='/login'></Redirect>;
		}
	}, [isAuthenticated]);
	return (
		<div>
			<button type='button' onClick={(e) => handleSubmit(e)}>
				Activate
			</button>
		</div>
	);
};

export default Activate;
