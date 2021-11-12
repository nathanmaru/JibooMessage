import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentResource,
	updateCurrentResource,
	deleteCurrentResource,
} from '../../../../store/classroomSlice';
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

const ResourceDashboard = (props) => {
	const dispatch = useDispatch();
	const [inputForm, setInputForm] = useState({
		name: '',
		description: '',
	});
	const resourceData = useSelector((state) => state.class.currentResource);
	useEffect(() => {
		console.log('hello fjslfj');
		dispatch(getCurrentResource());
	}, []);
	useEffect(() => {
		if (resourceData) {
			setInputForm({ name: resourceData.name, description: resourceData.description });
			setStatus(resourceData.status);
		}
	}, [resourceData]);
	const [status, setStatus] = React.useState('');
	console.log(props.id);

	const handleChange = (event) => {
		setStatus(event.target.value);
	};

	const { name, description } = inputForm;

	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	const editResource = () => {
		dispatch(updateCurrentResource(name, description, status));
	};
	const deleteResource = () => {
		dispatch(deleteCurrentResource());
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
					Resource Information:
				</Typography>

				<div className=' row-span-3 grid grid-cols-2 gap-4'>
					<div className='space-y-4 '>
						<TextField
							fullWidth
							required
							id='name'
							label='Resource Name'
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
					<div className=''>
						<TextField
							id='description'
							label='Description'
							fullWidth
							multiline
							minRows={4}
							name='description'
							value={description}
							defaultValue={description}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>
				<div className='row-span-2 flex justify-start items-center space-x-4'>
					<Button variant='contained' onClick={() => editResource()}>
						Save Changes
					</Button>
					<Button variant='outlined' onClick={() => deleteResource()}>
						Delete Resource
					</Button>
				</div>
			</Paper>
		</>
	);
};

export default ResourceDashboard;
