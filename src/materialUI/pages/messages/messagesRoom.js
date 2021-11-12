//List
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

// Card Imports
import Avatar from '@mui/material/Avatar';

import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';

import { getRooms } from '../../../store/messageSlice';

const MessagesRoom = () => {
	// hooks
	const location = useLocation();
	const dispatch = useDispatch();

	// states
	const [rooms, setRooms] = useState([]);

	// query string
	const { roomID } = queryString.parse(location.search);

	// get states
	const user = useSelector((state) => state.auth.user);
	const fetchRooms = useSelector((state) => state.message.rooms);

	// set states
	useEffect(() => {
		if (fetchRooms) {
			setRooms(fetchRooms);
		}
	}, [fetchRooms]);

	// fetch api

	useEffect(() => {
		dispatch(getRooms());
	}, []);

	return (
		<>
			{user ? (
				<List component='nav' aria-label='main mailbox folders'>
					{rooms.map((item) => (
						<ListItemButton
							selected={roomID == item.id}
							component={Link}
							to={`/messages?roomID=${item.id}`}
							sx={{
								borderRadius: '10px',
								marginBottom: '8px',
								overflowX: 'hidden',
							}}
							className='shadow-md'
						>
							<div className='justify-start flex items-center p-2'>
								<Avatar
									sx={{ marginLeft: '-10px' }}
									alt='Remy Sharp'
									src='https://images.unsplash.com/photo-1635336969198-ec9553adc0e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80'
								/>
							</div>
							<div className='justify-between mr-auto w-full p-2'>
								<div className='flex flex-col justify-between w-full'>
									<p className='justify-start text-base text-gray-500 font-medium lg:text-sm'>
										{item.title}
									</p>
									<div
										className='flex flex-row justify-between'
										style={{ maxWidth: '150px' }}
									>
										{item.messages.length > 0 ? (
											<p className='justify-between text-xs text-gray-500 mr-auto ml-1 truncate lg:text-gray-400'>
												{item.messages[item.messages.length - 1].includes(user.username)
													? item.messages[item.messages.length - 1].replace(
															user.username,
															'You'
													  )
													: item.messages[item.messages.length - 1]}
											</p>
										) : null}
									</div>
								</div>
							</div>
							{/* </div> */}
						</ListItemButton>
					))}
				</List>
			) : null}
		</>
	);
};

export default MessagesRoom;
