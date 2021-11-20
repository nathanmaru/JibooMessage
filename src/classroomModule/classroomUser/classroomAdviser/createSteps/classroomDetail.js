import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { createClassroom } from '../../../../store/classroomSlice';
import { styled } from '@mui/material/styles';
import useStatus from '../../../../hooks/useStatus';
import FeedBackButton from '../../../../hooks/feedBackButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { addAdviserClassroom } from '../../../../store/newClassroomSlice';
const Input = styled('input')({
	display: 'none',
});
const ClassroomDetail = () => {
	const defaultImage =
		'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
	const dispatch = useDispatch();
	const [inputForm, setInputForm] = useState({
		name: '',
		subject: '',
		privacy: 'public',
		description: '',
		cover: defaultImage,
		coverFile: defaultImage,
	});

	const { status } = useSelector((state) => state.class);
	const { loading } = useStatus(status);
	const handleClassroomDetail = () => {
		let form_data = new FormData();
		const { name, description, privacy, subject, cover, coverFile } = inputForm;
		if (coverFile != defaultImage) {
			form_data.append('cover', coverFile, coverFile.name);
		}
		form_data.append('name', name);
		form_data.append('description', description);
		form_data.append('privacy', privacy);
		form_data.append('subject', subject);
		dispatch(addAdviserClassroom(form_data));
	};
	console.log(inputForm.coverFile);
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == 'cover') {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setInputForm({
					...inputForm,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	};

	return (
		<>
			<div className='grid grid-cols-2 gap-4 mt-4'>
				<div className='flex flex-col space-y-3'>
					<Card sx={{ maxWidth: '100%' }}>
						<CardMedia
							component='div'
							image={inputForm.cover}
							className='flex justify-end items-center'
							sx={{
								height: '190px',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'end',
							}}
						>
							<label htmlFor='contained-button-file'>
								<Input
									accept='image/*'
									id='contained-button-file'
									name='cover'
									onChange={onChange}
									type='file'
								/>
								<Button
									variant='contained'
									startIcon={<PhotoCamera />}
									style={{
										marginRight: '10px',
										marginBottom: '10px',
										backgroundColor: 'white',
										color: 'rgba(55, 65, 81, 1)',
										textTransform: 'capitalize',
									}}
									component='span'
								>
									Change Cover Photo
								</Button>
							</label>
						</CardMedia>
					</Card>
					<TextField
						label='Classroom Name'
						variant='outlined'
						name='name'
						value={inputForm.name}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className=' flex flex-col space-y-3 '>
					<TextField
						label='Subject'
						variant='outlined'
						name='subject'
						value={inputForm.subject}
						onChange={(e) => onChange(e)}
					/>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Privacy</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={inputForm.privacy}
							label='Privacy'
							name='privacy'
							onChange={(e) => onChange(e)}
						>
							<MenuItem value={'public'}>Public</MenuItem>
							<MenuItem value={'private'}>Private</MenuItem>
						</Select>
					</FormControl>
					<TextField
						label='Description'
						variant='outlined'
						name='description'
						value={inputForm.description}
						onChange={(e) => onChange(e)}
						multiline
						minRows={4}
					/>
					<div className='flex justify-end'>
						<FeedBackButton
							button={
								<LoadingButton
									onClick={handleClassroomDetail}
									loading={loading}
									type='submit'
									variant='contained'
								>
									Create Classroom
								</LoadingButton>
							}
							status={status}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClassroomDetail;
