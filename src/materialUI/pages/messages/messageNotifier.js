import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Pusher from 'pusher-js';
import { useLocation } from 'react-router-dom';

const MessageNotifier = ({ selectedIndex }) => {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	const location = useLocation();
	const handleRefresh = () => {
		location.reload();
	};
	useEffect(() => {
		if (selectedIndex !== 0) {
			Pusher.logToConsole = true;

			const pusher = new Pusher('ba5283fee85d5a9a7b86', {
				cluster: 'ap1',
			});
			const channel = pusher.subscribe(`publicChat-${selectedIndex}`);
			channel.bind('message', function (data) {
				setOpen(true);

				console.log(data);
			});
		}
	}, []);

	const action = (
		<React.Fragment>
			<Button
				color='secondary'
				size='small'
				onClick={() => {
					handleClose();
					handleRefresh();
				}}
			>
				Refresh
			</Button>
			<IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message='You got a new message'
				action={action}
			/>
		</div>
	);
};

export default MessageNotifier;
