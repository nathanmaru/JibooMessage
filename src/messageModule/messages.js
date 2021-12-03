import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { getMessages, getRooms } from '../store/messageSlice';

const Messsages = () => {
	const dispatch = useDispatch();
	const messagesState = useFetch;
	const roomsState = useFetch;

	useEffect(() => {
		dispatch(getRooms(`/chat/room`));
	}, []);

	const fetchedRooms = useSelector((state) => state.message.rooms);
	const { items: rooms } = roomsState(fetchedRooms);

	// use variable rooms to map

	return (
		<>
			<h2>List of rooms</h2>
			<ul>
				{rooms.map((val) => (
					<li key={val.id}>{val.name}</li>
				))}
			</ul>
		</>
	);
};

export default Messsages;
