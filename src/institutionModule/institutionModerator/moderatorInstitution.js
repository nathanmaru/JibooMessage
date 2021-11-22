import { useState, useEffect } from 'react';

//Search
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';

//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//IconButton
import { HiOutlineFilter } from 'react-icons/hi';

import { styled } from '@mui/material/styles';
//Reusable
import CardHolder from '../../materialUI/components/reuseableComponents/cardHolder';
import CardComponent from '../../materialUI/components/reuseableComponents/cardComponent';
import DialogStepperComponent from '../../materialUI/components/reuseableComponents/dialogStepperComponent';
import BannerComponent from '../../materialUI/components/reuseableComponents/bannerComponent';

import { useSelector, useDispatch } from 'react-redux';
import {
	applyVerification,
	createInstitution,
	getMyInstitutions,
} from '../../store/newInstitutionSlice';
import useFetch from '../../hooks/useFetch';
import { getInstitutionPlans } from '../../store/subscriptionSlice';
// import Loader from '../../components/loader';

import Paypal from '../../materialUI/components/paypal';
import DialogComponent from '../../materialUI/components/reuseableComponents/dialogComponent';
import InstitutionDetails from './createSteps/institutionDetails';
import InstitutionVerification from './createSteps/institutionVerification';
import InstitutionSubscription from './createSteps/institutionSubscription';

const Input = styled('input')({
	display: 'flex',
});

const ModeratorInstitution = () => {
	// hooks
	const dispatch = useDispatch();

	useState(() => {
		dispatch(getMyInstitutions());
	}, []);

	const fetchPlans = useSelector((state) => state.subscription.plans);
	const { institutions: fetchInstitutions, status: institutionStatus } = useSelector(
		(state) => state.institution
	);

	const { items: institutions } = useFetch(fetchInstitutions);

	const steps = [
		{
			label: 'Institution Details',
			component: <InstitutionDetails />,
		},
		{
			label: 'Institution Verification',
			component: <InstitutionVerification />,
		},
		{
			label: 'Choose a Subscription Plan',
			component: <InstitutionSubscription />,
		},
	];

	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				<BannerComponent
					title='Hello Institution Manager!'
					subtitle='Just give us money please lol'
				>
					<DialogStepperComponent
						title='Create Institution'
						name='dialogStepper'
						steps={steps}
						button='Create New Institution'
					></DialogStepperComponent>
				</BannerComponent>

				<div className='w-full flex flex-row justify-end '>
					{/* Search Box */}
					<Paper
						variant='outlined'
						component='form'
						sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder='Search Institution'
							inputProps={{ 'aria-label': 'search institution' }}
						/>
						<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
							<SearchIcon />
						</IconButton>
					</Paper>

					<IconButton aria-label='filter' aria-haspopup='true' name='menu'>
						<HiOutlineFilter />
					</IconButton>
				</div>

				<CardHolder>
					{/* {institutionStatus == 'loading' ? <Loader /> : null} */}
					{institutions.map((item) => (
						<CardComponent
							image={item.cover}
							item={item}
							link={`/institutions/moderator/${item.id}?tab=dashboard`}
						/>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default ModeratorInstitution;
