import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	loadCurrentClassroom,
	editCurrentClassroom,
	deleteCurrentClassroom,
} from '../store/classroomSlice';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

const ClassroomDashboard = () => {
	const dispatch = useDispatch();
	const [inputForm, setInputForm] = useState({
		name: '',
		description: '',
		privacy: '',
		code: '',
		subject: '',
	});
	const { id } = useParams();
	useEffect(() => {
		dispatch(loadCurrentClassroom(id));
	}, []);
	const [privacy, setprivacy] = React.useState('');

	const currentClassroom = useSelector((state) => state.class.currentClassroom);
	useEffect(() => {
		if (currentClassroom) {
			setInputForm({
				classroom_name: currentClassroom.name,
				code: currentClassroom.code,
				subject: currentClassroom.subject,

				description: currentClassroom.description,
			});
			setprivacy(currentClassroom.privacy);
		}
	}, [currentClassroom]);

	const handleChange = (event) => {
		setprivacy(event.target.value);
	};

	const { name, code, subject } = inputForm;

	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	const editClassroom = () => {
		dispatch(editCurrentClassroom(name, privacy, code, subject));
	};
	const deleteClassroom = () => {
		dispatch(deleteCurrentClassroom());
	};
	const location = useLocation();
	const isResearcher = location.pathname.includes('researcher');
	console.log(location.pathname.includes('researcher'));

	return (
		<>
			<Paper variant='outlined' elevation={6} className='w-3/4 h-2/4 grid grid-rows-5 p-4 gap-2'>
				<Typography
					variant='h4'
					gutterBottom
					component='div'
					className='flex justify-start items-center'
				>
					Classroom Information:
				</Typography>
				<b>Thania please ko design ani... please consult me on this</b>
				<div className=' row-span-3 grid grid-cols-2 gap-4'>
					<div className='space-y-4 '>
						<TextField
							fullWidth
							required
							id='name'
							label='Classroom Name'
							name='name'
							value={name}
							onChange={(e) => onChange(e)}
							InputProps={{
								readOnly: isResearcher,
							}}
						/>
						<TextField
							fullWidth
							id='subject'
							label='Subject'
							name='subject'
							value={subject}
							onChange={(e) => onChange(e)}
							InputProps={{
								readOnly: isResearcher,
							}}
						/>
						{location.pathname.includes('researcher') ? null : (
							<>
								<FormControl fullWidth sx={{ minWidth: 80 }}>
									<InputLabel id='privacy-label'>Privacy</InputLabel>
									<Select
										labelId='demo-simple-select-autowidth-label'
										id='privacy'
										value={privacy}
										name='privacy'
										onChange={handleChange}
										label='Privacy'
									>
										<MenuItem value={'draft'}>Draft</MenuItem>
										<MenuItem value={'published'}>Published</MenuItem>
									</Select>
								</FormControl>
							</>
						)}
					</div>
					{isResearcher ? null : (
						<div className='space-y-4'>
							<TextField
								fullWidth
								id='code'
								label='Code'
								name='code'
								value={code}
								defaultValue={code}
								InputProps={{
									readOnly: true,
								}}
							/>
						</div>
					)}
				</div>
				{isResearcher ? null : (
					<div className='row-span-2 flex justify-start items-center space-x-4'>
						<Button variant='contained' onClick={() => editClassroom()}>
							Save Changes
						</Button>
						<Button variant='outlined' onClick={() => deleteClassroom()}>
							Delete Classroom
						</Button>
					</div>
				)}
			</Paper>
		</>
	);
};

export default ClassroomDashboard;
