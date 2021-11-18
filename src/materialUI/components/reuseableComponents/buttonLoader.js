import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const ButtonLoader = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};
	return (
		<>
			<Button onClick={handleToggle}>Show backdrop</Button>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</>
	);
};

export default ButtonLoader;
