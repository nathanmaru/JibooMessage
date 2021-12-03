import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import useFetch from '../hooks/useFetch';
import { getMessages, getRooms } from '../store/messageSlice';
import queryString from 'query-string';

const Messsages = () => {
	const dispatch = useDispatch();
	const messagesState = useFetch;
	const roomsState = useFetch;
	const history = useHistory();
	const location = useLocation();
	const { room } = queryString.parse(location.search);

	// rooms
	useEffect(() => {
		dispatch(getRooms(`/chat/room`));
	}, []);

	const fetchedRooms = useSelector((state) => state.message.rooms);
	const { items: rooms } = roomsState(fetchedRooms); // use variable rooms to map

	///use this for room onclick
	function handleClickRoom(code) {
		history.push(`/messages?navTab=messages&room=${code}`);
	}

	// messages
	useEffect(() => {
		if (room) {
			console.log(room);
			dispatch(getMessages(`/chat/?search=${room}`));
		}
	}, [room]);

	const fetchedMessages = useSelector((state) => state.message.messages);
	const { items: messages } = messagesState(fetchedMessages);

	return (
		<>
			<div className='grid grid-cols-2'>
				<div>
					<h2>List of rooms</h2>
					<ul>
						{rooms.map((val) => (
							<li
								className='cursor-pointer bg-gray-200 rounded-sm'
								onClick={() => handleClickRoom(val.code)}
								key={val.id}
							>
								<p>Room Name: {val.name}</p>
								<p>
									Room latest message: {val.latest_message.sender__username}:{' '}
									{val.latest_message.content}
								</p>
							</li>
						))}
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
		</>
	);
};

export default Messsages;
