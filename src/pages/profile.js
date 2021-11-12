import React, { useEffect, useState } from 'react';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCardComponent from '../materialUI/components/reuseableComponents/profileCardComponent';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import useFetch from '../hooks/useFetch';
import { editProfile, editProfileImage } from '../store/authSlice';

import PageManagerComponent from '../materialUI/components/reuseableComponents/pageManagerComponent';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import ProfileAbout from './profileAbout';
import DialogComponent from '../materialUI/components/reuseableComponents/dialogComponent';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Profile = ({ match }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const user = useSelector((state) => state.auth.user);
	const { items: profile, setItems: setProfile } = useFetch(user);

	const handleSubmit = (form_data) => {
		dispatch(editProfileImage(user.id, form_data));
	};
	const handleEdit = () => {
		const { first_name, last_name, about, username, email } = profile;
		dispatch(editProfile(first_name, last_name, username, email, about, user.id));
	};
	const onChange = (e) => {
		e.preventDefault();
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	const tabs = [
		// {
		// 	label: 'About',
		// 	link: `/profile?tab=about`,
		// 	value: 'about',
		// 	component: <ProfileAbout />,
		// },
		{
			label: 'Published Works',
			link: `/profile?tab=published-works`,
			value: 'published-works',
			component: <div>Publish Works</div>,
		},
		{
			label: 'Reading List',
			link: `/profile?tab=reading-list`,
			value: 'reading-list',
			component: <div>Reading List</div>,
		},
	];

	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				<ProfileCardComponent
					item={profile}
					setItem={setProfile}
					dispatchAction={handleSubmit}
					editButton={
						<DialogComponent
							maxWidth='sm'
							button={
								<Button variant='outlined' startIcon={<ModeEditIcon />}>
									Edit
								</Button>
							}
							title='Edit Profile'
							action={{ label: 'Edit', handler: handleEdit }}
						>
							<div className='flex flex-col w-full mt-4 space-y-4'>
								<TextField
									label='First Name'
									name='first_name'
									value={profile.first_name}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									label='Last Name'
									name='last_name'
									value={profile.last_name}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									label='Username'
									name='username'
									value={profile.username}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									label='Email'
									name='email'
									value={profile.email}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									fullWidth
									label='About'
									name='about'
									value={profile.email}
									onChange={(e) => onChange(e)}
									multiline
									minRows={8}
									variant='outlined'
									inputProps={{ maxLength: 150 }}
								/>
							</div>
						</DialogComponent>
					}
				/>

				<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
			</div>
		</>
	);
};

export default Profile;
