import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { AiFillFileAdd } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import queryString from 'query-string';
import {
	createFolder,
	editFolder,
	deleteFolder,
	uploadFile as uploadQuill,
	createFile,
} from '../../../../store/classResourceSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ResourceFilesTable from './resourceFilesTable';
import ResourceFolderList from './resourceFolderList';
import { useLocation } from 'react-router';

const Input = styled('input')({
	display: 'none',
});

const ResourceFolders = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { folder, resource } = queryString.parse(location.search);
	const [fileName, setFileName] = useState();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [openFolderEdit, setOpenFolderEdit] = React.useState(false);

	const handleClickOpenFolderEdit = () => {
		setOpenFolderEdit(true);
	};

	const handleCloseFolderEdit = () => {
		setOpenFolderEdit(false);
	};

	const [openCreateWorkspaceFile, setOpenCreateWorkspaceFile] = React.useState(false);

	const handleClickOpenCreateWorkspaceFile = () => {
		setOpenCreateWorkspaceFile(true);
	};

	const handleCloseCreateWorkspaceFile = () => {
		setOpenCreateWorkspaceFile(false);
	};

	const [inputForm, setInputForm] = useState({
		name: '',
	});

	const { name } = inputForm;
	const onChange = (e) => {
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};
	const onChangeFile = (e) => {
		setFileName(e.target.value);
	};
	const handleSubmit = () => {
		dispatch(createFolder(name, parseInt(resource)));
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open1 = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose1 = () => {
		setAnchorEl(null);
	};

	const edit_Folder = () => {
		dispatch(editFolder(folder, name, resource));
	};
	const delete_Folder = () => {
		dispatch(deleteFolder(folder));
	};

	const [uploadFile, setUploadFile] = useState({
		file: null,
	});
	const fileChange = (e) => {
		e.preventDefault();
		setUploadFile({ file: e.target.files[0] });
	};

	useEffect(() => {
		if (uploadFile.file !== null) {
			let form_data = new FormData();
			form_data.append('file', uploadFile.file, uploadFile.file.name);
			form_data.append('name', uploadFile.file.name);
			form_data.append('folder', folder);
			dispatch(uploadQuill(form_data));
		}
	}, [uploadFile.file]);

	const create_file = () => {
		console.log(fileName, folder);
		dispatch(createFile(fileName, folder));
	};

	return (
		<>
			<div class='grid grid-rows-7  gap-1 min-h-full'>
				<div class='grid grid-cols-4 gap-4 '>
					<div className='col-span-3  grid grid-cols-5'>
						<div class='flex flex-row justify-between items-center space-x-2'>
							<Tooltip title='New Folder'>
								<IconButton
									component='span'
									color='primary'
									aria-label='New Folder'
									onClick={handleClickOpen}
									sx={{
										border: 1,
										borderRadius: 1,
										'&:hover': { boxShadow: 5 },
									}}
								>
									<CreateNewFolderIcon />
								</IconButton>
							</Tooltip>
							{/* <form onSubmit={uploadNa}> */}
							<Tooltip title='Upload File'>
								<label htmlFor='upload-file-button'>
									<Input
										onChange={fileChange}
										accept='*'
										id='upload-file-button'
										type='file'
									/>
									<IconButton
										color='primary'
										aria-label='upload file'
										component='span'
										sx={{
											border: 1,
											borderRadius: 1,
											'&:hover': { boxShadow: 5 },
										}}
									>
										<UploadFileIcon />
									</IconButton>
								</label>
							</Tooltip>

							<Tooltip title='New Workspace File'>
								<IconButton
									color='primary'
									onClick={handleClickOpenCreateWorkspaceFile}
									aria-label='new workspace file'
									component='span'
									sx={{
										border: 1,
										borderRadius: 1,
										'&:hover': { boxShadow: 5 },
									}}
								>
									<AiFillFileAdd />
								</IconButton>
							</Tooltip>

							<Tooltip title='Options'>
								<IconButton
									color='primary'
									aria-label='new workspace file'
									component='span'
									onClick={handleClick}
									sx={{
										'&:hover': { boxShadow: 5 },
									}}
								>
									<MoreVertIcon />
								</IconButton>
							</Tooltip>
							<Menu
								id='basic-menu'
								anchorEl={anchorEl}
								open={open1}
								onClose={handleClose1}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem
									onClick={() => {
										handleClose1();
										if (folder == 0) {
											alert('Please Select a Folder');
										} else {
											handleClickOpenFolderEdit();
										}
									}}
								>
									Edit Folder
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleClose1();
										if (folder == 0) {
											alert('Please Select a Folder');
										} else {
											delete_Folder();
										}
									}}
								>
									Delete Folder
								</MenuItem>
							</Menu>
						</div>
						<div class='flex items-center col-span-4 ml-5'>
							<Typography
								variant='h5'
								component='h2'
								sx={{ fontWeight: 'fontWeightMedium' }}
							>
								Resource Name
							</Typography>
						</div>
					</div>
				</div>
				<div class='row-span-6 grid grid-cols-6 mt-4 '>
					<div className='mr-5 '>
						{/* FolderList Here */}
						<ResourceFolderList />
					</div>
					<div class='col-span-5 border-2 rounded-md  '>
						<ResourceFilesTable />
					</div>
				</div>
			</div>

			{/* Create Folder Dialog */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create New Folder</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<b>Reminder:</b> To name your folder descriptively so that your students can
						easily find what's in them.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						required
						value={name}
						onChange={(e) => onChange(e)}
						name='name'
						label='Folder Name'
						type='text'
						fullWidth
						variant='outlined'
					/>
				</DialogContent>
				<DialogActions sx={{ marginBottom: '20px', marginRight: '20px' }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						variant='contained'
						onClick={() => {
							handleClose();
							handleSubmit();
						}}
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>

			{/* Edit Folder Dialog */}
			<Dialog open={openFolderEdit} onClose={handleCloseFolderEdit}>
				<DialogTitle>Edit Folder</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<b>Reminder:</b> To name your folder descriptively so that your students can
						easily find what's in them.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						required
						value={name}
						onChange={(e) => onChange(e)}
						name='name'
						label='Folder Name'
						type='text'
						fullWidth
						variant='outlined'
					/>
				</DialogContent>
				<DialogActions sx={{ marginBottom: '20px', marginRight: '20px' }}>
					<Button onClick={handleCloseFolderEdit}>Cancel</Button>
					<Button
						variant='contained'
						onClick={() => {
							handleCloseFolderEdit();
							edit_Folder();
						}}
					>
						Edit
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openCreateWorkspaceFile} onClose={handleCloseCreateWorkspaceFile}>
				<DialogTitle>Create Workspace</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<b>Reminder:</b> To name your workspace descriptively so that your students can
						easily find what's in them.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						required
						value={fileName}
						onChange={(e) => onChangeFile(e)}
						name='fileName'
						label='File Name'
						type='text'
						fullWidth
						variant='outlined'
					/>
				</DialogContent>
				<DialogActions sx={{ marginBottom: '20px', marginRight: '20px' }}>
					<Button onClick={handleCloseCreateWorkspaceFile}>Cancel</Button>
					<Button
						variant='contained'
						onClick={() => {
							handleCloseCreateWorkspaceFile();
							create_file();
						}}
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ResourceFolders;
