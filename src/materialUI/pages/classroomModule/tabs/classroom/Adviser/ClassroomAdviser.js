import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BGImg from '../../../../../../assets/img/temp_bg.jpg';
import { createClassroom, getClassroom } from '../../../../../../store/classroomSlice';
import BannerComponent from '../../../../../components/reuseableComponents/bannerComponent';
import { TextField } from '@mui/material';
import DialogStepperComponent from '../../../../../components/reuseableComponents/dialogStepperComponent';
import CardHolder from '../../../../../components/reuseableComponents/cardHolder';
import CardComponent from '../../../../../components/reuseableComponents/cardComponent';
import useFetch from '../../../../../../hooks/useFetch';

const bg = BGImg;

const ClassroomAdviser = () => {
	const dispatch = useDispatch();
	// api call
	useEffect(() => {
		dispatch(getClassroom());
	}, []);
	// get from redux
	const { classes } = useSelector((state) => state.class);
	const { user } = useSelector((state) => state.auth);

	const { items: classrooms, setItems: setClassrooms } = useFetch(classes);
	const [inputForm, setInputForm] = useState({
		name: '',
		subject: '',
		privacy: 'public',
		description: '',
	});
	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	// stepper
	const handleClassroomDetail = () => {
		const { name, description, privacy, subject } = inputForm;
		// name, description, privacy, subject
		dispatch(createClassroom(name, description, privacy, subject));
		// alert('handleClassroomDetail');
	};
	const handleAffliate = () => {
		// alert('handleAffliate');
	};
	const handleSubscription = () => {
		// alert('handleSubscription');
	};
	const steps = [
		{
			label: 'Classroom Details',
			component: (
				<>
					<div className='flex flex-col w-full justify-center '>
						<TextField
							label='Classroom Name'
							variant='outlined'
							name='name'
							value={inputForm.name}
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
						<TextField
							label='Subject'
							variant='outlined'
							name='subject'
							value={inputForm.subject}
							onChange={(e) => onChange(e)}
							sx={{
								width: '520px',
								marginBottom: '3px',
								marginTop: '10px',
								marginLeft: '15px',
								padding: '2px',
								fontWeight: 'bold',
							}}
						/>
					</div>
				</>
				// Classroom Details Here</div>
			),
			stepComplete: handleClassroomDetail,
		},
		{
			label: 'Classroom Affliate',
			component: (
				<div className='flex w-full justify-center items-center'>
					Is this Classroom Affliate of An Institution?
				</div>
			),
			stepComplete: handleAffliate,
		},
		{
			label: 'Choose a Subscription Plan',
			component: (
				<div className='flex w-full justify-center items-center'>Subscription Plan Here</div>
			),
			stepComplete: handleSubscription,
		},
	];

	const actionWhenComplete = () => {
		alert('Complete start the request');
	};

	return (
		<>
			<div class='flex flex-col w-full p-4 space-y-4'>
				<BannerComponent
					title=' Hello dear, Adviser !'
					subtitle='Here is what’s happening with your projects today:'
				>
					<DialogStepperComponent
						button='Create Classroom'
						title='Create Classroom'
						steps={steps}
						actionWhenComplete={actionWhenComplete}
					></DialogStepperComponent>
				</BannerComponent>
				<CardHolder>
					{classrooms && classrooms.length > 0 ? (
						<>
							{classrooms.map((item) => (
								<CardComponent
									item={item}
									image={item.cover}
									link={`/classroom/adviser/${item.id}?classTab=dashboard`}
								></CardComponent>
							))}
						</>
					) : (
						<div>You don't have a classroom yet.</div>
					)}
				</CardHolder>
			</div>
		</>
	);
};

export default ClassroomAdviser;
