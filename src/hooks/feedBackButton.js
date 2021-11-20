import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const FeedBackButton = ({ button, status, actionSuccess, actionFailed, actionDescription }) => {
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openFailed, setOpenFailed] = useState(false);

	const handleSuccessClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSuccess(false);
	};
	const handleFailedClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenFailed(false);
	};

	useEffect(() => {
		if (status.includes('success')) {
			setOpenSuccess(true);
			if (actionSuccess) {
				actionSuccess();
			}
		}
		if (status.includes('failed')) {
			setOpenFailed(true);
			if (actionFailed) {
				actionFailed();
			}
		}
	}, [status]);
	return (
		<>
			{button}

			<Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
				<Alert onClose={handleSuccessClose} severity='success' sx={{ width: '100%' }}>
					{status}
				</Alert>
			</Snackbar>
			<Snackbar open={openFailed} autoHideDuration={6000} onClose={handleFailedClose}>
				<Alert onClose={handleFailedClose} severity='error' sx={{ width: '100%' }}>
					{status}
				</Alert>
			</Snackbar>
		</>
	);
};

export default FeedBackButton;
