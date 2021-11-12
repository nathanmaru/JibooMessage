import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const ExpMessages = () => {
	const [user, setUser] = useState('john');
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	let allMessages = [];

	useEffect(() => {
		// Pusher.logToConsole = true;

		const pusher = new Pusher('ba5283fee85d5a9a7b86', {
			cluster: 'ap1',
		});

		const channel = pusher.subscribe('chat');
		channel.bind('message', function (data) {
			allMessages.push(data);
			setMessages(allMessages);
			console.log(data);
		});
	}, []);
	const submit = async (e) => {
		e.preventDefault();

		await fetch('http://localhost:8000/chat/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user,
				message,
			}),
		});

		setMessage('');
	};
	console.log(messages);
	return (
		<>
			<div className='container'>
				<div className='d-flex flex-column align-items-stretch flex-shrink-0 bg-white'>
					<div className='d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom'>
						<input
							className='fs-5 fw-semibold'
							value={user}
							onChange={(e) => setUser(e.target.value)}
						/>
					</div>
					<div className='list-group list-group-flush border-bottom scrollarea'>
						{messages.map((message) => {
							return (
								<div className='list-group-item list-group-item-action py-3 lh-tight'>
									<div className='d-flex w-100 align-items-center justify-content-between'>
										<strong className='mb-1'>{message.user}</strong>
									</div>
									<div className='col-10 mb-1 small'>{message.message}</div>
								</div>
							);
						})}
					</div>
				</div>
				<form onSubmit={(e) => submit(e)}>
					<input
						className='form-control'
						placeholder='Write a message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</form>
			</div>
		</>
	);
};

export default ExpMessages;
