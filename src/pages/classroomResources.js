import React, { useState, useEffect } from 'react';
import ResourcesBanner from '../components/resourcesBanner';
import ResourcesCards from '../components/ResourcesCards';
import { createResources, loadResources } from '../store/classroomSlice';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import BannerComponent from '../materialUI/components/reuseableComponents/bannerComponent';
import { Button, TextField } from '@mui/material';
import DialogComponent from '../materialUI/components/reuseableComponents/dialogComponent';
import CardComponent from '../materialUI/components/reuseableComponents/cardComponent';
import CardHolder from '../materialUI/components/reuseableComponents/cardHolder';

const ClassroomResources = (props) => {
	const dispatch = useDispatch();
	const [items, setItems] = useState([]);
	const { id } = useParams();
	const { resources } = useSelector((state) => state.class);
	const [inputForm, setInputForm] = useState({ name: '', description: '' });
	const { name, description } = inputForm;

	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	useEffect(() => {
		dispatch(loadResources());
	}, []);

	useEffect(() => {
		if (resources) {
			console.log('Hello');
			setItems(resources);
		}
	}, [resources]);

	const location = useLocation();
	const isResearcher = location.pathname.includes('researcher');
	console.log(!isResearcher);

	// dialog

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		dispatch(createResources(name, description, id));
	};

	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				{location.pathname.includes('researcher') ? null : (
					<BannerComponent
						title=' Hello dear, Adviser !'
						subtitle='Here is where you can set up something to help your students.'
					>
						<DialogComponent
							button='Create Resource Package'
							handleClose={handleClose}
							open={open}
							title='Create Resource Package'
							context='Guide your students to grow.'
							action={
								<Button
									onClick={() => {
										handleClose();
										handleSubmit();
									}}
								>
									Create
								</Button>
							}
						>
							<TextField
								id='standard-search'
								label='Resource Name'
								variant='standard'
								name='name'
								value={name}
								onChange={(e) => onChange(e)}
								sx={{
									width: '520px',
									marginBottom: '3px',
									marginTop: '15px',
									marginLeft: '15px',
									padding: '2px',
									fontWeight: 'bold',
								}}
							/>
							<TextField
								id='standard-search'
								label='Description'
								variant='standard'
								name='description'
								value={description}
								onChange={(e) => onChange(e)}
								sx={{
									width: '520px',
									marginBottom: '3px',
									marginTop: '10px',
									marginLeft: '15px',
									padding: '2px',
									fontWeight: 'bold',
								}}
							/>
						</DialogComponent>
					</BannerComponent>
				)}

				<CardHolder>
					{items.length > 0
						? items.map((item) => (
								<CardComponent
									link={`/classroom/adviser/resources/${item.id}`}
									item={item}
								/>
						  ))
						: 'no resources created yet'}
					{items.length > 0
						? items.map((item) => (
								<CardComponent
									link={`/classroom/adviser/resources/${item.id}`}
									item={item}
								/>
						  ))
						: 'no resources created yet'}
					{items.length > 0
						? items.map((item) => (
								<CardComponent
									link={`/classroom/adviser/resources/${item.id}`}
									item={item}
								/>
						  ))
						: 'no resources created yet'}
				</CardHolder>
			</div>
		</>
	);
};

export default ClassroomResources;
