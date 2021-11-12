import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import ProfileCardComponent from '../../../components/reuseableComponents/profileCardComponent';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { editInstitution, retrieveInstitution } from '../../../../store/newInstitutionSlice';
import queryString from 'query-string';
import PageManagerComponent from '../../../components/reuseableComponents/pageManagerComponent';
import DiscoverArticles from '../../ManageInstitution/tabs/DiscoverArticles';
import FeaturedArticles from '../../ManageInstitution/tabs/FeaturedArticles';
import Staff from '../../ManageInstitution/tabs/Staff';
import Resources from '../../ManageInstitution/tabs/Resources';
import DialogComponent from '../../../components/reuseableComponents/dialogComponent';
import { Button, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const MyInstitutionManager = () => {
	const location = useLocation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		dispatch(retrieveInstitution(id));
	}, []);
	const fetchProfile = useSelector((state) => state.institution.currentInstitution);
	const { items: profile, setItems: setProfile } = useFetch(fetchProfile);

	const handleSubmit = (form_data) => {
		dispatch(editInstitution(id, form_data));
		// dispatch(editProfileImage(user.id, form_data));
	};
	const tabs = [
		{
			label: 'Discover Articles',
			link: `/myinstitution/${id}?tab=discover-articles`,
			value: 'discover-articles',
			component: <DiscoverArticles />,
		},
		{
			label: 'Featured Articles',
			link: `/myinstitution/${id}?tab=featured-articles`,
			value: 'featured-articles',
			component: <FeaturedArticles />,
		},
		{
			label: 'Staff',
			link: `/myinstitution/${id}?tab=staff`,
			value: 'staff',
			component: <Staff />,
		},
		{
			label: 'Resources',
			link: `/myinstitution/${id}?tab=resourcess`,
			value: 'resources',
			component: <Resources />,
		},
		{
			label: 'Publishing',
			link: `/myinstitution/${id}?tab=publishing`,
			value: 'publishing',
			component: <div>File not found</div>,
		},
		{
			label: 'Settings',
			link: `/myinstitution/${id}?tab=settings`,
			value: 'settings',
			component: <div>Settings Here</div>,
		},
	];
	const handleEdit = () => {
		const { name, description } = profile;
		let form_data = new FormData();
		form_data.append('name', name);
		form_data.append('description', description);
		dispatch(editInstitution(id, form_data));
	};
	const onChange = (e) => {
		e.preventDefault();
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className='flex flex-col space-y-4'>
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
							title='Edit Institution Profile'
							action={{ label: 'Edit', handler: handleEdit }}
						>
							<div className='flex flex-col w-full mt-4 space-y-4'>
								<TextField
									id='outlined-basic'
									label='Name'
									name='name'
									value={profile.name}
									onChange={(e) => onChange(e)}
									variant='outlined'
								/>
								<TextField
									id='outlined-basic'
									label='Description'
									name='description'
									multiline
									minRows={5}
									value={profile.description}
									onChange={(e) => onChange(e)}
									variant='outlined'
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

export default MyInstitutionManager;
