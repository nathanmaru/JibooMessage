import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import DialogStepperComponent from '../materialUI/components/reuseableComponents/dialogStepperComponent';
const StepperExp = () => {
	// Stepper
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const steps = [
		{
			label: 'Classroom Details',
			component: (
				<div className='flex w-full justify-center items-center'>Classroom Details Here</div>
			),
		},
		{
			label: 'Classroom Affliate',
			component: (
				<div className='flex w-full justify-center items-center'>
					Is this Classroom Affliate of An Institution?
				</div>
			),
		},
		{
			label: 'Choose a Subscription Plan',
			component: (
				<div className='flex w-full justify-center items-center'>Subscription Plan Here</div>
			),
		},
	];

	const actionWhenComplete = () => {
		alert('Complete start the request');
	};
	return (
		<>
			<Button color='secondary' variant='contained' onClick={handleClickOpen}>
				Sample Stepper
			</Button>
			<DialogStepperComponent
				title='Join Project Workspace'
				open={open}
				handleClose={handleClose}
				steps={steps}
				actionWhenComplete={actionWhenComplete}
			></DialogStepperComponent>
		</>
	);
};

export default StepperExp;
