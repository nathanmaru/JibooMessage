import {
	Avatar,
	Button,
	Card,
	CardContent,
	Menu,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../../../hooks/useFetch';
import {
	addStudent,
	getMembers,
	removeStudent,
} from '../../../../../../store/classroomMemberSlice';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';

const AdviserClassroomStudents = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// const member = { id: 1, firstname: 'jonathan' };

	const { id } = useParams();
	const dispatch = useDispatch();
	const studentStates = useFetch;
	useEffect(() => {
		dispatch(getMembers(id));
	}, []);
	const fetchedStudents = useSelector((state) => state.classMember.members);
	const { items: members, setItems: setMembers } = studentStates(fetchedStudents);
	const [username, setUsername] = useState('');
	const onChange = (e) => {
		e.preventDefault();
		setUsername(e.target.value);
	};
	const handleAddStudent = () => {
		dispatch(addStudent(id, username));
	};
	const handleRemoveStudent = (student) => {
		dispatch(removeStudent(student));
	};
	return (
		<>
			<div className='flex flex-col space-x-4'>
				<div className='flex w-full justify-end'>
					<DialogComponent
						title='Add Student'
						button={<Button variant='outlined'>Add Student</Button>}
						action={{ label: 'Add Student', handler: handleAddStudent }}
					>
						<div className='flex w-full mt-4'>
							<TextField
								fullWidth
								label='Student Username'
								variant='outlined'
								name='username'
								value={username}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</DialogComponent>
				</div>
				<div className='flex flex-row space-x-4 w-full  mt-2'>
					{members.map((member) => (
						<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
							<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
								<div className='flex w-full justify-end'>
									<MoreVertIcon
										className='cursor-pointer'
										aria-expanded={open ? 'true' : undefined}
										onClick={handleClick}
									/>
									{/* </Button> */}
								</div>
								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									<MenuItem
										onClick={() => {
											handleClose();
											handleRemoveStudent(member.id);
										}}
									>
										Remove
									</MenuItem>
								</Menu>
								<Avatar
									alt='Remy Sharp'
									src={member.image}
									sx={{ height: '100px', width: '100px', border: '1px solid #808080' }}
								/>
								<Typography
									className='text-gray-800'
									gutterBottom
									variant='h6'
									component='div'
								>
									{member.name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									@{member.username}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default AdviserClassroomStudents;
