import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { AiFillFileAdd } from 'react-icons/ai';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import DialogComponent from '../../../../components/reuseableComponents/dialogComponent';

const Input = styled('input')({
	display: 'none',
});
const ActionButtons = ({ onChange, newFolder, editFolder, newWorkspace, onDelete }) => {
	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	// menu
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div class='flex flex-row justify-between items-center space-x-2'>
				<Tooltip title='New Folder'>{newFolder}</Tooltip>
				{/* <form onSubmit={uploadNa}> */}
				<Tooltip title='Upload File'>
					<label htmlFor='upload-file-button'>
						<Input
							onChange={onChange}
							name='file'
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

				<Tooltip title='New Workspace File'>{newWorkspace}</Tooltip>

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
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem>{editFolder}</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose();
							onDelete();
						}}
					>
						Delete Folder
					</MenuItem>
				</Menu>
			</div>
		</>
	);
};

export default ActionButtons;
