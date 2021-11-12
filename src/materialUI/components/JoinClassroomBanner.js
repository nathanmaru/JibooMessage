import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { findClassroom, joinClassroom } from "../../store/classroomMemberSlice";
import { joinClassroom } from '../../store/classroomSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const JoinClassroomBanner = ({ title, subtitle, image, button1, button2 }) => {
	const [inputForm, setInputForm] = useState({ sectionCode: '' });
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const { sectionCode } = inputForm;
	const user = useSelector((state) => state.auth.user);
	const classroom = useSelector((state) => state.classMember.classroom);

	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = () => {
		dispatch(joinClassroom(user.id, sectionCode));
	};

	return (
		<>
			<div
				class='flex bg-cover rounded-lg bg-center text-black py-4 px-8 shadow-md'
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80')",
				}}
			>
				<div className='flex flex-row w-full justify-between'>
					<div class='md:w-1/2 w-full flex flex-row items-center justify-start'>
						<div class=''>
							<h3 className='text-3xl font-bold tracking-wider'>{title} </h3>
							<h5 className='text-sm tracking-wider text-gray-600'>{subtitle}</h5>
						</div>
					</div>

					<div className='flex flex-row items-center justify-between'>
						<div class='shadow-md rounded-lg'>
							{/* <Modal modal={modal} fields={fields} /> */}
							<Button
								variant='contained'
								sx={{ borderRadius: '5px', height: '44px', bgcolor: '#8b5cf6' }}
								onClick={handleClickOpen}
							>
								{button1}
							</Button>

							<Dialog open={open} onClose={handleClose}>
								<DialogTitle>Join Classroom</DialogTitle>
								<DialogContent>
									<DialogContentText sx={{ fontSize: '14px' }}>
										Collaborate with your classmates and discover something!
									</DialogContentText>
									<TextField
										id='standard-search'
										label='Code'
										variant='standard'
										name='sectionCode'
										value={sectionCode}
										onChange={(e) => onChange(e)}
										sx={{
											width: '520px',
											marginBottom: '3px',
											marginTop: '15px',
											marginLeft: '15px',
											padding: '2px',
											fontWeight: 'bold',
										}}
									/>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => {
											handleClose();
											handleSubmit();
										}}
									>
										Create
									</Button>
								</DialogActions>
							</Dialog>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default JoinClassroomBanner;
