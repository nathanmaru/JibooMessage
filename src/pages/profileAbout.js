import React, { useState, useEffect } from 'react';
import { CgRename } from 'react-icons/cg';
import InputIconField from '../components/commons/inputIconField';
import Modal from '../components/Modal';
import ModalContainer from '../components/modals/modalcontainer';
import ModalFooter from '../components/modals/modalFooter';
import ModalInputField from '../components/modals/modalInputField';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../store/authSlice';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ProfileAbout = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		about: '',
	});

	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			setFormData({
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				email: user.email,
				about: user.about,
			});
		}
	}, [user]);

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const { first_name, last_name, username, email, about } = formData;

	const handleSubmit = () => {
		console.log(first_name, last_name, username, email);
		dispatch(editProfile(first_name, last_name, username, email, about, user.id));
	};

	return (
		<>
			<div class='p-4'>
				<h1 class='text-xl font-medium tracking-wide'> About Me </h1>

				<div class='mt-6 grid grid-cols-2 w-full gap-4'>
					<div class='flex flex-col justify-start space-y-6'>
						<TextField
							label='First Name'
							name='first_name'
							value={first_name}
							onChange={(e) => onChange(e)}
							variant='outlined'
							required
						/>
						<TextField
							label='Last Name'
							name='last_name'
							value={last_name}
							onChange={(e) => onChange(e)}
							variant='outlined'
							required
						/>
						<TextField
							label='Username'
							name='username'
							value={username}
							onChange={(e) => onChange(e)}
							variant='outlined'
							required
						/>
						<TextField
							label='Email'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
							variant='outlined'
							required
						/>
					</div>
					{/* Right side  */}
					<div class='flex flex-col w-full justify-between '>
						<TextField
							fullWidth
							label='About'
							name='about'
							value={about}
							onChange={(e) => onChange(e)}
							multiline
							minRows={8}
							variant='outlined'
							inputProps={{ maxLength: 150 }}
						/>
						<div className='flex flex-row justify-end'>
							<Button variant='contained' onClick={handleSubmit}>
								Save Changes
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileAbout;
