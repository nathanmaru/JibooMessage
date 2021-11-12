import React, { useState } from 'react';

//Search
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

//Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Dialog-Modal
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//IconButton
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

//Reusable
import DialogComponent from '../../../components/reuseableComponents/dialogComponent';

//Icon
import { BiSearch } from 'react-icons/bi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { HiOutlineFilter } from 'react-icons/hi';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData(1, 'Sinogaya', 'Ma. Thania', 'thania.sinogaya@gmail.com', 'BS-Tech'),
	createData(2, 'Alvarez', 'Nicole', 'neekol.alvarez@gmail.com', 'BS-Tech'),
	createData(3, 'Aplacador', 'Jonathan', 'japlacador@gmail.com', 'BS-Tech'),
	createData(4, 'Redolosa', 'Reymond', 'reymondredolosa@gmail.com', 'BS-Tech'),
];

export default function Staff() {
	// Dialog
	const [formData, setFormData] = useState({
		name: '',
		dept: '',
	});
	const { name, dept } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const createProject = () => {};

	//Filter
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		// handleMobileMenuClose();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			// anchorOrigin={{
			// 	vertical: 'top',
			// 	horizontal: 'right',
			// }}
			id={menuId}
			keepMounted
			// transformOrigin={{
			// 	vertical: 'top',
			// 	horizontal: 'right',
			// }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
			// onClick={() => {
			// 	handleMenuClose();
			// 	goToProfile();
			// }}
			>
				Education
			</MenuItem>
			<MenuItem
			// onClick={() => {
			// 	handleMenuClose();
			// 	goToLogout();
			// }}
			>
				Engineering
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<div className='w-full flex flex-row justify-between mb-5'>
				{/* Search Box */}
				<div className='' style={{ width: '1158px' }}>
					<Box
						component='form'
						sx={{ '& > :not(style)': { m: 0.2, width: '100%' } }}
						noValidate
						autoComplete='off'
					>
						<TextField
							id='filled-basic'
							label='Search Staff'
							variant='standard'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<BiSearch className='text-purple-400' />
									</InputAdornment>
								),
							}}
							sx={{
								width: '500px',
								marginBottom: '3px',
								marginTop: '15px',
								marginLeft: '15px',
								padding: '2px',
								fontWeight: 'bold',
							}}
						/>
					</Box>
				</div>

				<div className='w-24 flex flex-row justify-between'>
					<div className='ml-auto w-12 h-full flex items-center justify-center'>
						<IconButton aria-label='add'>
							<DialogComponent
								title='Add Staff'
								context='Wa pko kabalo unsa ibutang here lol'
								maxWidth='sm'
								button='Add Staff'
								action={{ label: 'Add', handler: createProject }}
							>
								<TextField
									required
									id='name'
									label='Username'
									type='text'
									fullWidth
									variant='outlined'
									name='name'
									value={name}
									onChange={(e) => onChange(e)}
									sx={{ mt: '15px' }}
								/>

								<Box
									sx={{
										minWidth: 120,
										mb: '15px',
										mt: '15px',
									}}
								>
									<FormControl fullWidth sx={{ width: '552px' }}>
										<InputLabel id='demo-simple-select-label'>Department</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											label='Department'
											value={dept}
											onChange={(e) => onChange(e)}
										>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</DialogComponent>
						</IconButton>
					</div>

					<div className='w-12 h-full flex items-center justify-center'>
						<IconButton
							aria-label='filter'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
						>
							<HiOutlineFilter />
						</IconButton>
					</div>
				</div>
				{renderMenu}
			</div>

			{/* Table */}
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650, border: 1, borderColor: '#f4dff5' }}
					aria-label='simple table'
				>
					<TableHead sx={{ bgcolor: '#eae1eb' }}>
						<TableRow>
							<TableCell sx={{ color: '#866987' }}>ID Number</TableCell>
							<TableCell sx={{ color: '#866987' }}>Last Name</TableCell>
							<TableCell sx={{ color: '#866987' }}>First Name</TableCell>
							<TableCell sx={{ color: '#866987' }}>Email</TableCell>
							<TableCell sx={{ color: '#866987' }}>Department</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell>{row.calories}</TableCell>
								<TableCell>{row.fat}</TableCell>
								<TableCell>{row.carbs}</TableCell>
								<TableCell>{row.protein}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
