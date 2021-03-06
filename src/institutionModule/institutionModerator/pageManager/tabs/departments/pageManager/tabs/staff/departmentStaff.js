import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../../../../../hooks/useFetch';
import { addStaff, getStaffs, getStaffTypes } from '../../../../../../../../store/staffSlice';

// import { getDepartments } from "../../../../../../../../store/departmentSlice";

import DialogComponent from '../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';

//mui
import {
	Button,
	TextField,
	Typography,
	FormControl,
	InputLabel,
	Select,
	Menu,
	MenuItem,
	Card,
	CardContent,
	Avatar,
} from '@mui/material';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const DepartmentStaff = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const staffsState = useFetch;
	const staffTypeState = useFetch;
	// const staffDepartmentState = useFetch;
	useEffect(() => {
		dispatch(getStaffs(`/institution/staff?search=${id}`));
		dispatch(getStaffTypes(`/institution/staff-type`));
		// dispatch(getDepartments(id));
	}, []);
	const fetchedStaffs = useSelector((state) => state.staff.staffs);
	const fetchedStaffTypes = useSelector((state) => state.staff.staffTypes);
	const currentDepartment = useSelector((state) => state.department.currentDepartment);
	const { items: staffs } = staffsState(fetchedStaffs);
	const { items: staffTypes } = staffTypeState(fetchedStaffTypes);
	console.log(staffs);

	/**
	 * *Instructions for Adding Staff:
	 * Create this text Field(s) : username
	 * Create this dropdown: stafftype (map the variable staffTypes and use the name as item value) Please use react-hook-form for this
	 * Use/Modify the function: "handleAddStaff"
	 *
	 */
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [inputForm, setInputForm] = useState({
		username: '',
		type: '',
		department: '',
	});

	const onChange = (e) => {
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};

	function handleAddStaff() {
		let formData = new FormData();
		formData.append('institution', currentDepartment.institution);
		formData.append('department', currentDepartment.id);
		formData.append('type', currentDepartment.id);
		formData.append('username', currentDepartment.id);
		dispatch(addStaff(`/institution/staff`, formData));
	}

	// const validationMsg = Yup.object().shape({
	// 	username: Yup.string().required("Staff username is required."),
	// });

	// const {
	// 	register, // register inputs
	// 	handleSubmit, // handle form submit
	// 	formState: { errors },
	// } = useForm({
	// 	resolver: yupResolver(validationMsg),
	// });

	// const onSubmit = (data) => {
	// 	console.log(JSON.stringify(data, null, 2));
	// };

	return (
		<>
			<div className='flex flex-col space-x-4'>
				<div className='flex w-full justify-end'>
					<DialogComponent
						title='Add Staff'
						button={
							<Button className='add' variant='outlined'>
								Add Staff
							</Button>
						}
						// action={{ label: "Add Staff", handler: handleAddStaff }}
					>
						<div className='flex flex-col w-full space-y-4 mt-4'>
							<TextField
								fullWidth
								label='Staff Username'
								variant='outlined'
								name='username'
								value={inputForm.username}
								onChange={(e) => onChange(e)}
								// {...register("username")}
								// error={errors.username ? true : false}
							/>
							{/* <Typography
								sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
							>
								{errors.username?.message}
							</Typography> */}

							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Staff Type</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={inputForm.type}
									label='Staff Type'
									onChange={(e) => onChange(e)}
									name='type'
								>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									{staffTypes.map((val) => (
										<MenuItem key={val.id} value={val.id}>
											{val.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Department</InputLabel>

								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={inputForm.department}
									label='Department'
									onChange={onChange}
									name='department'
								>
									{/* {departments.map((val) => (
										<MenuItem value={val.id}>{val.name}</MenuItem>
									))} */}
								</Select>
							</FormControl>
						</div>
						<div className='mt-5'>
							<Button className='add' variant='outlined' onClick={handleAddStaff}>
								Add Staff
							</Button>
						</div>
					</DialogComponent>
				</div>

				<div className='cards flex flex-row space-x-4 w-full mt-2 bg-green-50'>
					{staffs.map((item) => (
						<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
							<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
								{/* <div className="flex w-full justify-end">
									<MoreVertIcon
										className="cursor-pointer"
										aria-expanded={open ? "true" : undefined}
										onClick={handleClick}
									/>
								</div> */}

								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									<MenuItem
									// onClick={() => {
									// 	handleClose();
									// 	handleRemoveStaff(staff.id);
									// }}
									>
										Remove
									</MenuItem>
								</Menu>

								<Avatar
									alt='Remy Sharp'
									src={item.image}
									sx={{
										height: '100px',
										width: '100px',
										border: '1px solid #808080',
									}}
								/>
								<Typography
									className='text-gray-800'
									gutterBottom
									variant='h6'
									component='div'
								>
									{item.name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									@{item.username}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default DepartmentStaff;
