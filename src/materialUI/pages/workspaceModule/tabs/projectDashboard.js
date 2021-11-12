import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentWorkspace,
	updateWorkspace,
	deleteWorkspace,
} from '../../../../store/workspaceSlice';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDashboard = ({ id }) => {
	const dispatch = useDispatch();
	const [inputForm, setInputForm] = useState({
		name: '',
		code: '',
		description: '',
	});
	useEffect(() => {
		dispatch(getCurrentWorkspace(id));
	}, []);
	const [status, setStatus] = React.useState('');

	const currentWorkspace = useSelector((state) => state.works.currentWorkspace);
	useEffect(() => {
		if (currentWorkspace) {
			setInputForm({
				name: currentWorkspace.name,
				code: currentWorkspace.code,
				description: currentWorkspace.description,
			});
			setStatus(currentWorkspace.status);
		}
	}, [currentWorkspace]);

	const handleChange = (event) => {
		setStatus(event.target.value);
	};

	const { name, code, description } = inputForm;

	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	const editClassroom = () => {
		dispatch(updateWorkspace(name, description, status, id));
	};
	const deleteClassroom = () => {
		dispatch(deleteWorkspace(id));
	};

	return (
		<>
			{/* <ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/> */}
			<Paper variant='outlined' elevation={6} className='w-3/4 h-2/4 grid grid-rows-5 p-4 gap-2'>
				<Typography
					variant='h4'
					gutterBottom
					component='div'
					className='flex justify-start items-center'
				>
					Project Information:
				</Typography>

				<div className=' row-span-3 grid grid-cols-2 gap-4'>
					<div className='space-y-4 '>
						<TextField
							fullWidth
							required
							id='name'
							label='Project Name'
							name='name'
							value={name}
							onChange={(e) => onChange(e)}
						/>

						<FormControl fullWidth sx={{ minWidth: 80 }}>
							<InputLabel id='status-label'>Status</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								id='status'
								value={status}
								name='status'
								onChange={handleChange}
								label='Status'
							>
								<MenuItem value={'draft'}>Draft</MenuItem>
								<MenuItem value={'published'}>Published</MenuItem>
							</Select>
						</FormControl>
					</div>

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
						<TextField
							fullWidth
							id='description'
							label='Description'
							name='description'
							value={description}
							multiline
							minRows={4}
							defaultValue={description}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>
				<div className='row-span-2 flex justify-start items-center space-x-4'>
					<Button variant='contained' onClick={() => editClassroom()}>
						Save Changes
					</Button>
					<Button variant='outlined' onClick={() => deleteClassroom()}>
						Delete Classroom
					</Button>
				</div>
			</Paper>
		</>
	);
};

export default ProjectDashboard;
