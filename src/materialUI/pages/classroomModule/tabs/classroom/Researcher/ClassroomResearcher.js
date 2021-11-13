import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassroomCards from '../../../../../../components/classroomCards';
import JoinClassroomBanner from '../../../../../components/JoinClassroomBanner';
import BGImg from '../../../../../../assets/img/temp_bg.jpg';
import { getStudentClassroom, joinClassroom } from '../../../../../../store/classroomSlice';
import BannerComponent from '../../../../../components/reuseableComponents/bannerComponent';
import { Button, TextField, Typography } from '@mui/material';
import DialogComponent from '../../../../../components/reuseableComponents/dialogComponent';
import CardHolder from '../../../../../components/reuseableComponents/cardHolder';
import CardComponent from '../../../../../components/reuseableComponents/cardComponent';

const bg = BGImg;

const ClassroomResearcher = () => {
	const dispatch = useDispatch();
	const [items, setItems] = useState([{ id: 1, name: 'name' }]);
	const [inputForm, setInputForm] = useState({ sectionCode: '' });
	const { sectionCode } = inputForm;
	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	const user = useSelector((state) => state.auth.user);
	// const { classes } = useSelector((state) => state.class);
	// useEffect(() => {
	// 	dispatch(getStudentClassroom());
	// }, []);
	// useEffect(() => {
	// 	if (classes) {
	// 		setItems(classes);
	// 	}
	// }, [classes]);

	// Dialog
	const handleSubmit = () => {
		dispatch(joinClassroom(user.id, sectionCode));
	};
	return (
		<>
			<div class='flex flex-col w-full p-4 space-y-4'>
				<BannerComponent
					title=' Hello dear, Researcher !'
					subtitle='Get guidance in writing by joining to your adviser classroom'
				>
					<DialogComponent
						button={<Button variant='contained'>Join Classroom</Button>}
						title='Join Classroom'
						context='Collaborate with your classmates and discover something!'
						action={{ label: 'Join', handler: handleSubmit }}
					>
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
					</DialogComponent>
				</BannerComponent>

				<CardHolder>
					{items && items.length > 0 ? (
						<>
							{items.map((item) => (
								<CardComponent
									item={item}
									height='150px'
									width='600px'
									link={`/classroom/researcher/${item.id}?tab=dashboard`}
								>
									<div className='flex flex-col space-y-2 w-full'>
										<div class='flex justify-end'>
											<DialogComponent
												title='Dummy'
												button={<Button variant='contained'>Add Article</Button>}
											></DialogComponent>
										</div>
										<div>
											<Typography gutterBottom variant='h6' component='div'>
												{item.name}
											</Typography>
											<Typography variant='body2' color='text.secondary'>
												{item.description}
											</Typography>
										</div>
									</div>
								</CardComponent>
							))}
						</>
					) : (
						<div className='flex justify-center items-center w-full h-full'>
							you don't have classrooms that you have joined yet.
						</div>
					)}
				</CardHolder>
			</div>
		</>
	);
};

export default ClassroomResearcher;
