import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createClassroom } from '../../../store/classroomSlice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 650,
	borderRadius: '10px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default function CreateClassroomModal() {
	const [showModal, setShowModal] = React.useState(false);
	const dispatch = useDispatch();

	const [inputForm, setInputForm] = React.useState({ name: '', subject: '' });
	const { name, subject } = inputForm;
	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	const owner = useSelector((state) => state.auth.user);

	const handleSubmit = () => {
		const { id } = owner;
		dispatch(createClassroom(name, subject, id));
	};

	return (
		<>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h5' component='h1'>
					Create Classroom
				</Typography>
				<Typography id='modal-modal-title' sx={{ fontSize: '14px', color: '#a6a6a6' }}>
					Help your students discover something!
				</Typography>

				<TextField
					id='standard-search'
					label='Classroom Name'
					variant='standard'
					name='name'
					value={name}
					onChange={(e) => onChange(e)}
					sx={{
						width: '570px',
						marginBottom: '3px',
						marginTop: '15px',
						marginLeft: '15px',
						padding: '2px',
						fontWeight: 'bold',
					}}
				/>
				<TextField
					id='standard-search'
					label='Subject'
					variant='standard'
					name='subject'
					value={subject}
					onChange={(e) => onChange(e)}
					sx={{
						width: '570px',
						marginBottom: '3px',
						marginTop: '10px',
						marginLeft: '15px',
						padding: '2px',
						fontWeight: 'bold',
					}}
				/>
				<div className='flex flex-row justify-between mt-8'>
					<button
						className=' justify-between ml-auto bg-purple-800 text-white active:bg-emerald-600 font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-600 outline-none focus:outline-none mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
						type='button'
						onClick={() => {
							setShowModal(false);
							handleSubmit();
						}}
					>
						Create
					</button>
				</div>
			</Box>
		</>
	);
}
