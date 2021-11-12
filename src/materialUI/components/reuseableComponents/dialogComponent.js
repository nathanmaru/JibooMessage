import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';

const DialogComponent = (props) => {
	const { title, context, action, maxWidth, name, button } = props;
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div onClick={handleClickOpen}>{button}</div>
			<Dialog
				component='div'
				fullWidth={true}
				name={name}
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{context}</DialogContentText>
					{props.children}
				</DialogContent>
				{action ? (
					<DialogActions sx={{ marginBottom: '20px', marginRight: '20px' }}>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							onClick={() => {
								handleClose();
								action.handler();
							}}
						>
							{action.label}
						</Button>
					</DialogActions>
				) : null}
			</Dialog>
		</>
	);
};

export default DialogComponent;
