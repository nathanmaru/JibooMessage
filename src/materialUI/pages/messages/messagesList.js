import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';

import { getMessages, getRooms, sendMessage, createRoom } from '../../../store/messageSlice';

const MessagesList = () => {
	// hooks
	const location = useLocation();
	const dispatch = useDispatch();

	// states
	const [messages, setMessages] = useState([]);

	// query string
	const { roomID } = queryString.parse(location.search);

	// get states
	const messageFetch = useSelector((state) => state.message.messages);

	// set states
	useEffect(() => {
		if (messageFetch) {
			setMessages(messageFetch);
		}
	}, [messageFetch]);

	// fetch api

	useEffect(() => {
		if (roomID) {
			dispatch(getMessages(roomID));
		}
	}, [roomID]);

	//Pusher

	useEffect(() => {
		Pusher.logToConsole = true;

		const pusher = new Pusher('ba5283fee85d5a9a7b86', {
			cluster: 'ap1',
		});
		const channel = pusher.subscribe(`publicChat-${roomID}`);
		channel.bind('message', function (data) {
			setMessages((messages) => [...messages, data]);
			console.log(`publicChat-${roomID}`);
		});
	}, [roomID]);

	return (
		<>
			{messages.length > 0 ? (
				<div
					id='messages'
					className='flex flex-col-reverse space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
				>
					{messages
						.slice(0)
						.reverse()
						.map((val) => (
							<div className='chat-message'>
								<div className='flex items-end'>
									<div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
										<div>{val.user}</div>
										<div>
											<span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
												{val.content}
											</span>
										</div>
									</div>

									<img
										src='https://images.unsplash.com/photo-1635510238241-a53e14fe659e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
										alt=''
										className='object-cover w-6 h-6 rounded-full order-1'
									/>
								</div>
							</div>
						))}

					{/* Sender Message Chat */}
				</div>
			) : (
				<div className='flex w-full justify-center items-center'>no messages yet</div>
			)}
		</>
	);
};

export default MessagesList;
