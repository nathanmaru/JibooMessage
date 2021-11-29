import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
//Search
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//IconButton
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
//Icons
import { BsPlusSquare } from 'react-icons/bs';
import { FiCamera } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import { HiOutlineFilter } from 'react-icons/hi';

import { styled } from '@mui/material/styles';
//Reusable
import CardHolder from '../../components/reuseableComponents/cardHolder';
import CardComponent from '../../components/reuseableComponents/cardComponent';
import DialogStepperComponent from '../../components/reuseableComponents/dialogStepperComponent';
import BannerComponent from '../../components/reuseableComponents/bannerComponent';

import { useSelector, useDispatch } from 'react-redux';
import {
	applyVerification,
	createInstitution,
	getInstitutions,
} from '../../../store/newInstitutionSlice';
import useFetch from '../../../hooks/useFetch';
import { getInstitutionPlans } from '../../../store/subscriptionSlice';
import Loader from '../../components/loader';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

import blankImage from '../../../assets/img/clean-frame.png';

import Paypal from '../../components/paypal';
import DialogComponent from '../../components/reuseableComponents/dialogComponent';

const Input = styled('input')({
	display: 'flex',
});

const ManageInstitution = ({ item }) => {
	// hooks
	const dispatch = useDispatch();
	// Dialog
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		desc: '',
		image: '',
	});
	const { name, category, desc } = formData;
	// Steps in using custom useFetch hook for easy getting of items
	// 1. dispatch the action
	useState(() => {
		dispatch(getInstitutionPlans());
		dispatch(getInstitutions());
	}, []);
	// 2. get the selector
	const fetchPlans = useSelector((state) => state.subscription.plans);
	const { institutions: fetchInstitutions, status: institutionStatus } = useSelector(
		(state) => state.institution
	);
	// 3. use useFetch by passing the selector result
	const { items: plans } = useFetch(fetchPlans);
	const { items: institutions } = useFetch(fetchInstitutions);

	const [checkout, setCheckout] = useState(false);
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == 'image') {
			setFormData({ ...formData, [e.target.name]: e.target.files[0] });
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};
	console.log(formData);

	//Stepper
	const handleInstitutionDetail = () => {
		dispatch(createInstitution(name));
		// alert('handleInstitutionDetail');
	};
	const handleVerification = () => {
		let form_data = new FormData();
		form_data.append('document', formData.image, formData.image.name);
		form_data.append('institution', institutions[0].id);
		dispatch(applyVerification(form_data));
		// console.log(formData.image, institutions[0].id);
		// alert('handleVerification');
	};
	const handleSubscription = () => {
		setCheckout(true);
		// alert('handleSubscription');
	};

	const steps = [
		{
			label: 'Institution Details',
			component: (
				<>
					<div className='flex flex-col w-full justify-center items-center'>
						<TextField
							label='Institution Name'
							variant='outlined'
							name='name'
							value={formData.name}
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
						<Box
							sx={{
								minWidth: 120,
								mb: '15px',
								mt: '15px',
								ml: '20px',
							}}
						>
							<FormControl fullWidth sx={{ width: '516px' }}>
								<InputLabel id='demo-simple-select-label'>Category</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									label='Category'
									value={category}
									onChange={(e) => onChange(e)}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>
				</>
				// Institution Details Here</div>
			),
			stepComplete: handleInstitutionDetail,
		},
		{
			label: 'Institution Verification',
			component: (
				<div className='w-full h-80 flex flex-col items-center justify-center'>
					<label htmlFor='contained-button-file'>
						<Input
							accept='image/*'
							name='image'
							id='contained-button-file'
							type='file'
							onChange={onChange}
						/>
						{/* <Button
							variant='contained'
							startIcon={<FiCamera />}
							style={{
								marginRight: '10px',
								marginBottom: '10px',
								marginTop: '20px',
								backgroundColor: 'white',
								color: 'rgba(55, 65, 81, 1)',
								textTransform: 'capitalize',
							}}
							component='span'
						>
							Upload Verification Photo
						</Button> */}
					</label>
				</div>
			),
			stepComplete: handleVerification,
		},
		{
			label: 'Choose a Subscription Plan',
			component: (
				<>
					{institutions ? (
						<div className='flex w-full justify-center items-center'>
							{plans.map((item) => (
								<DialogComponent title='Pay Thru:' button={<CardComponent item={item} />}>
									<Paypal
										item={item}
										productlabel='institution'
										productID={institutions}
									/>
								</DialogComponent>
							))}
						</div>
					) : null}
				</>
			),
			stepComplete: handleSubscription,
		},
	];

	const actionWhenComplete = () => {
		alert('Complete start the request');
	};

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
						actionWhenComplete={actionWhenComplete}
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
					{institutionStatus == 'loading' ? <Loader /> : null}
					{institutions.map((item) => (
						<CardComponent
							image={item.cover}
							item={item}
							link={`/myinstitution/${item.id}?tab=discover-articles`}
						/>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default ManageInstitution;
