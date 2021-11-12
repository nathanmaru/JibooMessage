import React, { Component } from 'react';
import axios from 'axios';
import { verifyUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Experiment = ({ location }) => {
	const dispatch = useDispatch();
	const { token } = queryString.parse(location.search);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(verifyUser(token));
	};

	return (
		<div className='flex flex-col w-screen h-screen justify-center items-center space-y-6'>
			<Typography variant='h4' gutterBottom component='div'>
				Click below to activate your account.
			</Typography>
			<Button onClick={handleSubmit} color='primary' variant='contained'>
				Activate
			</Button>
		</div>
	);
};

export default Experiment;
