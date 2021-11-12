/*tabs*/
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
/*textfield*/
import TextField from '@mui/material/TextField';
//Search Imports
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import profile from '../assets/img/avatar-2.jpg';
import { loadImageUser } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

import { useEffect, useState } from 'react';
import { getInstitutionManage } from '../store/institutionSlice';

import ManageInstitution from '../materialUI/pages/institutionModule/ManageInstitution';

/*tabs*/
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

/*avatar*/
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: '.5rem',
	// backgroundColor: "#d6d6d6",
	backgroundColor: 'rgba(229, 231, 235, 1)',
	borderStyle: 'solid',
	borderColor: '#6d0cad',
	// borderColor: "#838CFF",
	border: '2px',
	'&:hover': {
		backgroundColor: 'rgba(229, 231, 235, 1)',
	},
	// marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',

	[theme.breakpoints.up('sm')]: {
		// marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '40ch',
		},
	},
}));

/*avatar*/
const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '10px',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 22,
	height: 22,
	border: `2px solid ${theme.palette.background.paper}`,
}));

const Input = styled('input')({
	display: 'none',
});

/*cards*/
//const bg = BGImg;

const items = [
	{
		id: '1',
		name: 'Cebu Technological University - MC',
		date: '02-22-21',
	},
];

const Institution = ({ item }) => {
	/*tabs*/
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	/*sort*/
	const [age, setAge] = React.useState('');

	const handleSortChange = (event) => {
		setAge(event.target.value);
	};

	/*dialog*/
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	/*avatar*/
	const [profile, setProfile] = React.useState({ pic: '' });
	const { image, user } = useSelector((state) => state.auth);
	const { pic } = profile;

	const onChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

	React.useEffect(() => {
		if (user) {
			setProfile({ pic: user.image });
		}
	}, []);
	console.log(pic);

	/*dropdown*/
	const [instCategory, setCategory] = React.useState('');

	const handleCategoryChange = (event) => {
		setCategory(event.target.value);
	};

	/*cards*/
	/* const dispatch = useDispatch();
	const [items, setItems] = useState(null);
	const { classes, isLoading } = useSelector((state) => state.class);
	useEffect(() => {
		dispatch(getInstitutionManage());
	}, []);
	useEffect(() => {
		if (classes) {
			setItems(classes);
		}
	}, [classes]);   */

	return (
		/*tabs*/
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
					<Tab label='Managing' {...a11yProps(0)} />
					<Tab label='Joined' {...a11yProps(1)} />
				</Tabs>
			</Box>

			{/* Tab Pages */}
			<TabPanel value={value} index={0}>
				<ManageInstitution />
			</TabPanel>

			<TabPanel value={value} index={1}>
				{/* <JoinedInstitution /> */}
			</TabPanel>
		</Box>
	);
};

export default Institution;
