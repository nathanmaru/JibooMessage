
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import useFetch from "../hooks/useFetch";
import { createRoom, getMessages, getRooms, sendMessage } from '../store/messageSlice';
import queryString from "query-string";

//Icons
import { BiMessageAltAdd } from "react-icons/bi";
import { BsInfoCircle, BsSearch } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";

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
} from "@mui/material";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import DialogComponent from "../materialUI/components/reuseableComponents/dialogComponent";



const Messsages = () => {
	const dispatch = useDispatch();
	const messagesState = useFetch;
	const roomsState = useFetch;
	const userState = useFetch;
	const history = useHistory();
	const location = useLocation();
	const { room } = queryString.parse(location.search);

	const currentUser = useSelector((state) => state.auth.user);

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
	const [name, setName] = useState("");

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
  // For Real Time Messaging
	let allMessages = [];
	const [dataCatched, setDataCatched] = useState();
	useEffect(() => {
		if (dataCatched) {
			messages.map((val) => {
				allMessages.push(val);
			});
			allMessages.push(dataCatched);

			setMessages(allMessages);
		}
	}, [dataCatched]);
	function catchData(data) {
		setDataCatched(data);
	}

	useEffect(() => {
		if (room) {
			Pusher.logToConsole = true;
			const pusher = new Pusher('ba5283fee85d5a9a7b86', {
				cluster: 'ap1',
			});
			const channel = pusher.subscribe('chat');
			channel.bind(room, function (data) {
				catchData(data);
			});
		}
	}, [room]);
  //validation
	const validationMsg = Yup.object().shape({
		room_name: Yup.string().required("Room Name is required."),
		username: Yup.string().required("Username is required."),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));
	};

	const items = [
		{
			id: 1,
			username: "Eda Yildiz",
			role: "Creator/Admin",
		},
		{
			id: 2,
			username: "Eda Yildiz",
			role: "Creator/Admin",
		},
	];


	return (
		<>
			<div className="">
				<div>
					<div>
						<div
							className=" relative min-h-screen flex flex-col"
							style={{ minHeight: "675px", maxHeight: "675px" }}
						>
							<div className="flex-grow w-full mx-auto lg:flex">
								<div
									className="flex-1 min-w-0 xl:flex"
									style={{ minHeight: "665px", maxHeight: "665px" }}
								>
									<div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
										<div
											className="pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0"
											style={{ minHeight: "665px", maxHeight: "665px" }}
										>
											<div className="h-full relative">
												<div className="flex flex-row justify-between ml-2">
													<p className="text-2xl text-gray-500 p-1 justify-start">
														{" "}
														Chats
													</p>

													<DialogComponent
														title="New Chat Room"
														button={
															<IconButton color="primary" aria-label="add room">
																<BiMessageAltAdd />
															</IconButton>
														}
													>
														<form onSubmit={handleSubmit(onSubmit)}>
															<TextField
																fullWidth
																sx={{ mt: 1 }}
																id="outlined-search"
																label="Enter room name"
																variant="outlined"
																name="room_name"
																{...register("room_name")}
																error={errors.room_name ? true : false}
															/>
															<Typography
																sx={{
																	fontSize: "12px",
																	color: "red",
																	fontStyle: "italic",
																}}
															>
																{errors.room_name?.message}
															</Typography>

															<div className="mt-5">
																<Button
																	className="add"
																	variant="contained"
																	type="submit"
																>
																	Create Room
																</Button>
															</div>
														</form>
													</DialogComponent>
												</div>

												{/* Room List */}
												<List
													sx={{
														width: "100%",
														maxHeight: "580px",
														minHeight: "580px",
														overflowY: "auto",
														mt: 1,
													}}
												>
													{rooms.length > 0 ? (
														<>
															{rooms.map((val) => (
																<ListItem
																	// className="cursor-pointer bg-gray-200 rounded-sm mb-2"
																	sx={{ cursor: "pointer" }}
																	onClick={() => handleClickRoom(val.code)}
																	key={val.id}
																>
																	<ListItemAvatar>
																		<Avatar>
																			<RiChat1Line />
																		</Avatar>
																	</ListItemAvatar>
																	<ListItemText
																		primary={val.name}
																		secondary={
																			<>
																				{val.latest_message && (
																					<p>
																						{
																							val.latest_message
																								.sender__username
																						}
																						: {val.latest_message.content}
																					</p>
																				)}
																			</>
																		}
																	/>
																</ListItem>
															))}
														</>
													) : (
														"You have no rooms yet"
													)}
												</List>
											</div>
										</div>
									</div>

									{/* Right Side */}
									<div
										className="flex-1 p:2 sm:pb-6 justify-between flex flex-col  xl:flex"
										style={{ minHeight: "675px", maxHeight: "675px" }}
									>
										<div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
											<div className="flex items-center space-x-4">
												<img
													src="https://images.unsplash.com/photo-1635336969198-ec9553adc0e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80"
													alt=""
													className="w-10 sm:w-12 h-10 sm:h-12 ml-2 rounded-full cursor-pointer object-cover"
												/>

												<div className="flex flex-col leading-tight">
													<div className="text-1xl mt-1 flex items-center">
														<span className="text-gray-700 mr-3">
															{/* {selectedRoom} */} selected room
														</span>
														<span className="text-green-500">
															<svg width={10} height={10}>
																<circle
																	cx={5}
																	cy={5}
																	r={5}
																	fill="currentColor"
																/>
															</svg>
														</span>
													</div>
												</div>
											</div>

											<div className="flex items-center space-x-2">
												<IconButton aria-label="search">
													<BsSearch />
												</IconButton>

												<DialogComponent
													title="Chat Room Information"
													button={
														<IconButton color="primary" aria-label="Room Info">
															<BsInfoCircle />
														</IconButton>
													}
												>
													<TextField
														fullWidth
														sx={{ mt: 1 }}
														id="outlined-search"
														label="Room name"
														variant="outlined"
														name="room_name"
													/>

													<List
														sx={{
															width: "100%",
															maxHeight: "330px",
															minHeight: "330px",
															bgcolor: "background.paper",
															overflowY: "auto",
															mt: 1,
														}}
													>
														{items.map((item) => (
															<ListItem>
																<ListItemAvatar>
																	<Avatar src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
																</ListItemAvatar>
																<ListItemText
																	primary={item.username}
																	secondary={item.role}
																/>
															</ListItem>
														))}
													</List>

													<div className="mt-1">
														<DialogComponent
															maxWidth="xs"
															title="Add Member"
															button={
																<Button
																	color="primary"
																	aria-label="Room Info"
																	variant="contained"
																>
																	Add Member
																</Button>
															}
														>
															<form onSubmit={handleSubmit(onSubmit)}>
																<TextField
																	fullWidth
																	sx={{ mt: 1 }}
																	id="outlined-search"
																	label="Username"
																	variant="outlined"
																	name="username"
																	{...register("username")}
																	error={errors.username ? true : false}
																/>

																<Typography
																	sx={{
																		fontSize: "12px",
																		color: "red",
																		fontStyle: "italic",
																	}}
																>
																	{errors.username?.message}
																</Typography>

																<div className="mt-5">
																	<div>
																		<Button type="submit" variant="contained">
																			Add
																		</Button>
																	</div>
																</div>
															</form>
														</DialogComponent>
													</div>
												</DialogComponent>
											</div>
										</div>

										{/* Conversation */}
										{messages.length > 0 ? (
											<div
												id="messages"
												className="flex flex-col-reverse space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
											>
												{messages.map((val) => (
													<div className="chat-message">
														<div className="flex items-end bg-blue-50">
															<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start bg-red-50">
																<li className="bg-green-200" key={val.id}>
																	<p>{val.sender.full_name}</p>
																	<p>{val.content}</p>
																</li>
															</div>
														</div>
													</div>
												))}
											</div>
										) : (
											<p className="text-center text-gray-400">
												Please click on one of the chat rooms
											</p>
										)}

										<div className="border-t-2 border-gray-200 p-4 -mb-3.5">
											<div className="relative flex">
												<FormControl
													sx={{ m: 1, width: "25ch" }}
													variant="outlined"
												>
													<TextField
														fullWidth
														multiline
														minRows={3}
														// value={message}
														// onChange={handleChangeMessage}
														// onKeyPress={submitEnter}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		aria-label="send"
																		edge="end"
																		sx={{ m: 2 }}
																		// onClick={submit}
																	>
																		<FiSend />
																	</IconButton>
																</InputAdornment>
															),
														}}
														sx={{
															width: "1000px",
															padding: "5px",
															textAlign: "justify",
														}}
														label="Type message here ..."
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
			</div>
			{/* <div className="grid grid-cols-2">
				<div>
					{messages.length > 0 ? (
						<>
							{messages.map((val) => (
								<li className="bg-green-200" key={val.id}>
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

				<TextField variant="outlined" value={name} onChange={onChange} />
				<Button variant="contained" type="submit" onClick={handleAddRoom}>
					Create Room
				</Button>
			</div> */}

		</>
	);
};

export default Messsages;
