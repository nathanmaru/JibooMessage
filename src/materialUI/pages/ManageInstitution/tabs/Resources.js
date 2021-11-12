import * as React from 'react';
import { useState } from 'react';

//Card
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

//Dialog-Modal

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

//Select Imports

import MenuItem from '@mui/material/MenuItem';

//Icons

import {
	BsFolderPlus,
	BsFileEarmarkArrowUp,
	BsFileEarmarkPlus,
	BsThreeDotsVertical,
} from 'react-icons/bs';

import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import AvatarGroups from '../../../components/avatarGroups';

import ManageFolderList from './ManageFolderList';
import FilesTable from './FilesTable';

//Reusable

const Input = styled('input')({
	display: 'none',
});

const Resources = () => {
	// Dialog
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	//Select
	const [dept, setDept] = React.useState('');

	const handleChange = (event) => {
		setDept(event.target.value);
	};

	return (
		<>
			<div class='grid grid-rows-7 gap-2 min-h-full'>
				<div class='grid grid-cols-4 gap-4 max-h-10'>
					<div className='col-span-3  grid grid-cols-5'>
						<div class='flex flex-row justify-between items-center space-x-2'>
							<Tooltip title='New Folder'>
								<IconButton
									component='span'
									color='primary'
									aria-label='New Folder'
									// onClick={handleClickOpen}
									sx={{
										border: 1,
										borderRadius: 1,
										'&:hover': { boxShadow: 5 },
									}}
								>
									<BsFolderPlus />
								</IconButton>
							</Tooltip>

							<Tooltip title='Upload Template'>
								<label htmlFor='upload-file-button'>
									<Input
										// onChange={fileChange}
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
										<BsFileEarmarkArrowUp />
									</IconButton>
								</label>
							</Tooltip>

							<Tooltip title='New Template File'>
								<IconButton
									color='primary'
									// onClick={handleClickOpenCreateWorkspaceFile}
									aria-label='new workspace file'
									component='span'
									sx={{
										border: 1,
										borderRadius: 1,
										'&:hover': { boxShadow: 5 },
									}}
								>
									<BsFileEarmarkPlus />
								</IconButton>
							</Tooltip>

							<Tooltip title='Options'>
								<IconButton
									color='primary'
									aria-label='new workspace file'
									component='span'
									// onClick={handleClick}
									sx={{
										'&:hover': { boxShadow: 5 },
									}}
								>
									<BsThreeDotsVertical />
								</IconButton>
							</Tooltip>

							<Menu
								id='basic-menu'
								// anchorEl={anchorEl}
								// open={open1}
								// onClose={handleClose1}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem
								// onClick={() => {
								// 	handleClose1();
								// 	if (folder == 0) {
								// 		alert('Please Select a Folder');
								// 	} else {
								// 		handleClickOpenFolderEdit();
								// 	}
								// }}
								>
									Edit Folder
								</MenuItem>
								<MenuItem
								// onClick={() => {
								// 	handleClose1();
								// 	if (folder == 0) {
								// 		alert('Please Select a Folder');
								// 	} else {
								// 		delete_Folder();
								// 	}
								// }}
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

					<div className='flex flex-row justify-end items-center'>
						<AvatarGroups />
					</div>
				</div>

				<div class='row-span-6 grid grid-cols-6 mt-4 '>
					<div className='mr-5 '>
						{/* FolderList Here */}
						{/* <ResourceFolderList /> */}
						<ManageFolderList />
					</div>
					<div class='col-span-5 border-2 rounded-md  '>
						{/* <ResourceFilesTable /> */}
						<FilesTable />
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};
export default Resources;
