import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Avatar,
	Button,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import useFetch from '../../../hooks/useFetch';
import ProductDetailComponent from '../../../materialUI/components/reuseableComponents/dashboardComponentCopy';
import DialogComponent from '../../../materialUI/components/reuseableComponents/dialogComponent';
import ProfileCardComponent from '../../../materialUI/components/reuseableComponents/profileCardComponent';
import { editInstitution, retrieveInstitution } from '../../../store/newInstitutionSlice';
import queryString from 'query-string';

import { styled } from '@mui/material/styles';
import PageManagerComponent from '../../../materialUI/components/reuseableComponents/pageManagerComponent';
const Input = styled('input')({
	display: 'none',
});

const ModeratorInstitutionPageManager = () => {
	// const defaultImage =
	// 	'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

	const location = useLocation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);
	const institutionState = useFetch;

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		dispatch(retrieveInstitution(id));
	}, []);
	const fetchProfile = useSelector((state) => state.institution.currentInstitution);
	const [institution, setInstitution] = useState({});
	const [defaultImage, setDefaultImage] = useState();

	const handleSubmit = (form_data) => {
		// dispatch(editProfileImage(user.id, form_data));
	};
	useEffect(() => {
		if (fetchProfile) {
			setInstitution({ ...fetchProfile, coverFile: fetchProfile.cover });
			setDefaultImage(fetchProfile.cover);
		}
	}, [fetchProfile]);
	const handleEdit = () => {
		let form_data = new FormData();
		const { name, address, contact, email, website, privacy, description, cover, coverFile } =
			institution;
		console.log(coverFile, cover);
		if (coverFile != defaultImage) {
			form_data.append('cover', coverFile, coverFile.name);
		}
		form_data.append('name', name);
		form_data.append('address', address);
		form_data.append('contact', contact);
		form_data.append('email', email);
		form_data.append('website', website);
		form_data.append('privacy', privacy);
		form_data.append('description', description);
		dispatch(editInstitution(id, form_data));
	};
	const handleDelete = () => {};
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == 'cover') {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setInstitution({
					...institution,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setInstitution({ ...institution, [e.target.name]: e.target.value });
		}
	};

	const tabs = [
		{
			label: 'Dashboard',
			link: `/institutions/moderator/${id}?tab=dashboard`,
			value: 'dashboard',
			component: 'Dashboard',
		},
		{
			label: 'Articles',
			link: `/institutions/moderator/${id}?tab=articles`,
			value: 'articles',
			component: 'FeaturedArticles',
		},
		{
			label: 'Staff',
			link: `/institutions/moderator/${id}?tab=staff`,
			value: 'staff',
			component: 'Staff',
		},
		{
			label: 'Resources',
			link: `/institutions/moderator/${id}?tab=resourcess`,
			value: 'resources',
			component: 'Resources',
		},
		{
			label: 'Publishing',
			link: `/institutions/moderator/${id}?tab=publishing`,
			value: 'publishing',
			component: <div>File not found</div>,
		},
		{
			label: 'Settings',
			link: `/institutions/moderator/${id}?tab=settings`,
			value: 'settings',
			component: <div>Settings Here</div>,
		},
	];
	return (
		<>
			<div className='flex flex-col space-y-4'>
				<ProductDetailComponent product={institution}>
					<div className='grid grid-cols-2 w-full gap-2 '>
						<div className='flex flex-col space-y-4 '>
							<h5 className='text-2xl font-bold text-gray-700'>{institution.name}</h5>
							<div className='mt-1 flex flex-row items-center'>
								<Avatar
									alt='Remy Sharp'
									src='https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
								/>
								<p className='text-sm text-gray-600 ml-2'>{institution.owner} </p>
							</div>
							<p>{institution.description}</p>
						</div>
						<div className='flex flex-col justify-between items-end space-y-4'>
							<div className='flex justify-between'></div>
							<div className='flex justify-between space-x-2 '>
								<DialogComponent
									title='institution Package Info'
									button={<Button variant='contained'>Edit Institution Info</Button>}
								>
									<div className='flex flex-col space-y-4 '>
										<Card sx={{ maxWidth: '100%' }}>
											<CardMedia
												component='div'
												image={institution.cover}
												className='flex justify-end items-center'
												sx={{
													height: '120px',
													display: 'flex',
													justifyContent: 'flex-end',
													alignItems: 'end',
												}}
											>
												<label htmlFor='contained-button-file'>
													<Input
														accept='image/*'
														id='contained-button-file'
														name='cover'
														onChange={onChange}
														type='file'
													/>
													<Button
														variant='contained'
														startIcon={<PhotoCamera />}
														style={{
															marginRight: '10px',
															marginBottom: '10px',
															backgroundColor: 'white',
															color: 'rgba(55, 65, 81, 1)',
															textTransform: 'capitalize',
														}}
														component='span'
													>
														Change Cover Photo
													</Button>
												</label>
											</CardMedia>
										</Card>
										<TextField
											label='Institution Name'
											variant='outlined'
											name='name'
											value={institution.name}
											onChange={(e) => onChange(e)}
										/>
										<TextField
											label='Address'
											variant='outlined'
											name='address'
											value={institution.address}
											onChange={(e) => onChange(e)}
										/>
										<TextField
											label='Contact No.'
											variant='outlined'
											name='contact'
											value={institution.contact}
											onChange={(e) => onChange(e)}
										/>
										<TextField
											label='Institution Email'
											variant='outlined'
											name='email'
											value={institution.email}
											onChange={(e) => onChange(e)}
										/>
										<TextField
											label='Website'
											variant='outlined'
											name='website'
											value={institution.website}
											onChange={(e) => onChange(e)}
										/>
										<FormControl fullWidth>
											<InputLabel id='demo-simple-select-label'>Privacy</InputLabel>
											<Select
												labelId='demo-simple-select-label'
												id='demo-simple-select'
												value={institution.privacy}
												label='Privacy'
												name='privacy'
												onChange={(e) => onChange(e)}
											>
												<MenuItem value={'private'}>Private</MenuItem>
												<MenuItem value={'public'}>Public</MenuItem>
											</Select>
										</FormControl>
										<TextField
											label='Description'
											variant='outlined'
											name='description'
											value={institution.description}
											onChange={(e) => onChange(e)}
											multiline
											minRows={4}
										/>
										<div className='flex w-full space-x-2'>
											<Button variant='contained' onClick={handleEdit}>
												Save Changes
											</Button>
											<Button color='error' onClick={handleDelete}>
												Delete
											</Button>
										</div>
									</div>
								</DialogComponent>
								{/* {tab === 'files' ? (
									<>
										<FolderMenu />
										<FileMenu />
									</>
								) : null} */}
							</div>
						</div>
					</div>
				</ProductDetailComponent>
				<PageManagerComponent tabs={tabs} value={value} handleChange={handleChange} />
			</div>
		</>
	);
};

export default ModeratorInstitutionPageManager;
