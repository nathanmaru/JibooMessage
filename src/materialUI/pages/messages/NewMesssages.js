import * as React from 'react';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getMessages, getRooms, sendMessage, createRoom } from '../../../store/messageSlice';

//Icons
import { BiMessageAltAdd } from 'react-icons/bi';
import { BsInfoCircle, BsSearch } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';

//mui
import {
	InputAdornment,
	FormControl,
	TextField,
	IconButton,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from '@mui/material';

import MessageNotifier from './messageNotifier';
import MessagesRoom from './messagesRoom';
import MessagesList from './messagesList';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';

import DialogComponent from '../../components/reuseableComponents/dialogComponent';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Pusher from 'pusher-js';

export default function NewMesssages() {
	const [message, setMessage] = useState([]);
	const location = useLocation();

	const [user, setUser] = useState({
		username: '',
		first_name: '',
		last_name: '',
	});

	let allMessages = [];
	useEffect(() => {
		Pusher.logToConsole = true;

		const pusher = new Pusher('', {
			cluster: '',
		});

		const channel = pusher.subscribe('chat'); //change this to code
		channel.bind('message', function (data) {
			allMessages.push(data);
			setMessage(allMessages);
		});
	}, []);

	const dispatch = useDispatch();

	const handleChangeMessage = (event) => {
		setMessage(event.target.value);
	};

	const roomList = useSelector((state) => state.message.rooms);
	const { isLoading } = useSelector((state) => state.message);
	const messageFetch = useSelector((state) => state.message.messages);
	const userFetch = useSelector((state) => state.auth.user);
	const [i, setI] = useState(0);

	useEffect(() => {
		if (userFetch) {
			setUser(userFetch);
		}
	}, [userFetch]);

	//List
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedRoom, setSelectedRoom] = useState();

	// query string
	const { roomID } = queryString.parse(location.search);

	const submit = (e) => {
		e.preventDefault();

		dispatch(sendMessage(message, parseInt(roomID)));
		// send message here
		setMessage('');
	};

	//Modals
	const [inputForm, setInputForm] = React.useState({ room_name: '' });
	const { room_name } = inputForm;
	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const create_Room = () => {
		// dispatch(createRoom(username));
	};

	//validation
	const validationMsg = Yup.object().shape({
		room_name: Yup.string().required('Room Name is required.'),
		username: Yup.string().required('Username is required.'),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmitCreateRoom = (data) => {
		console.log(JSON.stringify(data, null, 2));
	};

	const onSubmitAddMember = (data) => {
		console.log(JSON.stringify(data, null, 2));
	};

	const items = [
		{
			id: 1,
			username: 'Eda Yildiz',
			role: 'Creator/Admin',
		},
		{
			id: 2,
			username: 'Eda Yildiz',
			role: 'Creator/Admin',
		},
	];

	return (
		<>
			<div className=''>
				<div>
					<div
						className=' relative min-h-screen flex flex-col'
						style={{ minHeight: '675px', maxHeight: '675px' }}
					>
						{/* Chat Layout */}

						<div className='flex-grow w-full mx-auto lg:flex'>
							<div
								className='flex-1 min-w-0 xl:flex'
								style={{ minHeight: '665px', maxHeight: '665px' }}
							>
								<div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50'>
									<div
										className='pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'
										style={{ minHeight: '665px', maxHeight: '665px' }}
									>
										<div className='h-full relative'>
											<div className='flex flex-row justify-between ml-2'>
												<p className='text-2xl text-gray-500 p-1 justify-start'>
													{' '}
													Chats
												</p>
												<DialogComponent
													title='New Chat Room'
													button={
														<IconButton color='primary' aria-label='add room'>
															<BiMessageAltAdd />
														</IconButton>
													}
												>
													<form onSubmit={handleSubmit(onSubmitCreateRoom)}>
														<TextField
															fullWidth
															sx={{ mt: 1 }}
															id='outlined-search'
															label='Enter room name'
															variant='outlined'
															name='room_name'
															{...register('room_name')}
															error={errors.room_name ? true : false}
														/>
														<Typography
															sx={{
																fontSize: '12px',
																color: 'red',
																fontStyle: 'italic',
															}}
														>
															{errors.room_name?.message}
														</Typography>

														<div className='mt-5'>
															<Button
																className='add'
																variant='contained'
																type='submit'
															>
																Create Room
															</Button>
														</div>
													</form>
												</DialogComponent>
											</div>

											<div
												className='h-full p-2 mt-2 overflow-y-auto space-y-1'
												style={{ minHeight: '600px', maxHeight: '600px' }}
											>
												{/* Room List */}
												<MessagesRoom />
											</div>
										</div>
									</div>
								</div>

								{/* Right Side */}
								<div
									className='flex-1 p:2 sm:pb-6 justify-between flex flex-col  xl:flex'
									style={{ minHeight: '675px', maxHeight: '675px' }}
								>
									<div className='flex sm:items-center justify-between py-3 border-b border-gray-200 p3'>
										<div className='flex items-center space-x-4'>
											<img
												src='https://images.unsplash.com/photo-1635336969198-ec9553adc0e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80'
												alt=''
												className='w-10 sm:w-12 h-10 sm:h-12 ml-2 rounded-full cursor-pointer object-cover'
											/>

											<div className='flex flex-col leading-tight'>
												<div className='text-1xl mt-1 flex items-center'>
													<span className='text-gray-700 mr-3'>{selectedRoom}</span>
													<span className='text-green-500'>
														<svg width={10} height={10}>
															<circle cx={5} cy={5} r={5} fill='currentColor' />
														</svg>
													</span>
												</div>
											</div>
										</div>

										<div className='flex items-center space-x-2'>
											<IconButton aria-label='search'>
												<BsSearch />
											</IconButton>

											<DialogComponent
												title='Chat Room Information'
												button={
													<IconButton color='primary' aria-label='Room Info'>
														<BsInfoCircle />
													</IconButton>
												}
											>
												<TextField
													fullWidth
													sx={{ mt: 1 }}
													id='outlined-search'
													label='Room name'
													variant='outlined'
													name='room_name'
												/>
												{/* Lists */}
												<List
													sx={{
														width: '100%',
														maxHeight: '330px',
														minHeight: '330px',
														bgcolor: 'background.paper',
														overflowY: 'auto',
														mt: 1,
													}}
												>
													{items.map((item) => (
														<ListItem>
															<ListItemAvatar>
																<Avatar>d</Avatar>
															</ListItemAvatar>
															<ListItemText
																primary={item.username}
																secondary={item.role}
															/>
														</ListItem>
													))}
												</List>
												<div className='mt-1'>
													<DialogComponent
														maxWidth='xs'
														title='Add Member'
														button={
															<Button
																color='primary'
																aria-label='Room Info'
																variant='contained'
															>
																Add Member
															</Button>
														}
													>
														<form onSubmit={handleSubmit(onSubmitAddMember)}>
															<TextField
																fullWidth
																sx={{ mt: 1 }}
																id='outlined-search'
																label='Username'
																variant='outlined'
																name='username'
																{...register('username')}
																error={errors.username ? true : false}
															/>

															<Typography
																sx={{
																	fontSize: '12px',
																	color: 'red',
																	fontStyle: 'italic',
																}}
															>
																{errors.username?.message}
															</Typography>

															<div className='mt-5'>
																<Button
																	// className="add"
																	variant='contained'
																	type='submit'
																>
																	Add
																</Button>
															</div>
														</form>
													</DialogComponent>
												</div>
											</DialogComponent>
										</div>
									</div>

									{/* Messages starts here */}
									{/* <MessagesList /> */}

									{/* Messages ends here */}
									<div className='border-t-2 border-gray-200 p-4 -mb-3.5'>
										<div className='relative flex'>
											<FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
												<TextField
													multiline
													minRows={3}
													value={message}
													onChange={handleChangeMessage}
													// onKeyPress={submitEnter}
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<IconButton
																	aria-label='send'
																	edge='end'
																	sx={{ m: 2 }}
																	onClick={submit}
																>
																	<FiSend />
																</IconButton>
															</InputAdornment>
														),
													}}
													sx={{
														width: '900px',
														padding: '5px',
														textAlign: 'justify',
													}}
													label='Type message here ...'
												/>
											</FormControl>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
