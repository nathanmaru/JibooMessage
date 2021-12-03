import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import useFetch from '../hooks/useFetch';
import { createRoom, getMessages, getRooms, sendMessage } from '../store/messageSlice';
import queryString from 'query-string';
import { Button, TextField } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Messsages = () => {
	const dispatch = useDispatch();
	const messagesState = useFetch;
	const roomsState = useFetch;
	const userState = useFetch;
	const history = useHistory();
	const location = useLocation();
	const { room } = queryString.parse(location.search);

	const currentUser = useSelector((state) => state.auth.user);
	const { items: you } = userState(currentUser);

	// list rooms
	useEffect(() => {
		dispatch(getRooms(`/chat/room`));
	}, []);

	const fetchedRooms = useSelector((state) => state.message.rooms);
	const { items: rooms } = roomsState(fetchedRooms); // use variable rooms to map

	///use this for room onclick
	function handleClickRoom(code) {
		history.push(`/messages?navTab=messages&room=${code}`);
	}

	// list of messages
	useEffect(() => {
		if (room) {
			console.log(room);
			dispatch(getMessages(`/chat/?search=${room}`));
		}
	}, [room]);

	const fetchedMessages = useSelector((state) => state.message.messages);
	const { items: messages, setItems: setMessages } = messagesState(fetchedMessages);

	// create room
	const [name, setName] = useState('');

	function onChange(e) {
		setName(e.target.value);
	}

	function handleAddRoom() {
		let members = [];
		members.push(currentUser.username);
		dispatch(createRoom(`/chat/room`, { name, members }));
	}

	const [message, setMessage] = useState('');

	function onChangeMessage(e) {
		setMessage(e.target.value);
	}

	function handleSendMessage() {
		dispatch(sendMessage(`/chat/`, { content: message, sender: currentUser.id, room }));
	}

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const action = (
		<>
			<Button
				color='secondary'
				size='small'
				onClick={() => {
					handleClose();
					dispatch(getMessages(`/chat/?search=${room}`));
				}}
			>
				Fetch
			</Button>
			<IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</>
	);
	let allMessages = [];
	const [you2, setYou2] = useState(0);
	useEffect(() => {
		if (you2 !== 0) {
			if (you2 !== currentUser.id) {
				handleClick();
			}
		}
	}, [you2]);
	function catchId(sender) {
		setYou2(sender);
	}

	useEffect(() => {
		if (room) {
			Pusher.logToConsole = true;

			const pusher = new Pusher('ba5283fee85d5a9a7b86', {
				cluster: 'ap1',
			});

			const channel = pusher.subscribe('chat');
			channel.bind(room, function (data) {
				catchId(data.sender.id);
			});
		}
	}, [room]);

	return (
		<>
			<div className='grid grid-cols-2'>
				<div>
					<h2>List of rooms</h2>
					<ul>
						{rooms.length > 0 ? (
							<>
								{rooms.map((val) => (
									<li
										className='cursor-pointer bg-gray-200 rounded-sm mb-2'
										onClick={() => handleClickRoom(val.code)}
										key={val.id}
									>
										<p>Room Name: {val.name}</p>
										{val.latest_message && (
											<p>
												Room latest message: {val.latest_message.sender__username}:{' '}
												{val.latest_message.content}
											</p>
										)}
									</li>
								))}
							</>
						) : (
							'You have no rooms yet'
						)}
					</ul>
				</div>
				<div>
					{messages.length > 0 ? (
						<>
							{messages.map((val) => (
								<li className='bg-green-200' key={val.id}>
									<p>{val.sender.full_name}</p>
									<p>{val.content}</p>
								</li>
							))}
						</>
					) : (
						<p>Please click on one of the chat rooms</p>
					)}
				</div>
			</div>
			<div>
				<TextField variant='outlined' value={name} onChange={onChange} />
				<Button
					variant='contained'
					placeholder='Enter Room Name'
					type='submit'
					onClick={handleAddRoom}
				>
					Create Room
				</Button>
			</div>
			<div>
				<TextField
					variant='outlined'
					placeholder='Enter Message'
					value={message}
					onChange={onChangeMessage}
				/>
				<Button variant='contained' type='submit' onClick={handleSendMessage}>
					Send message
				</Button>
			</div>

			<Snackbar
				open={open}
				// autoHideDuration={6000}
				onClose={handleClose}
				message='New Message Receive'
				action={action}
			/>
		</>
	);
};

export default Messsages;
