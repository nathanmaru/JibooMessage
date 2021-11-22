import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import DialogComponent from '../../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { TextField } from '@mui/material';
import { useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	addFolder,
	deleteFolder,
	editFolder,
	retrieveFolder,
} from '../../../../../../../../../../store/newFolderSlice';
import queryString from 'query-string';
import useFetch from '../../../../../../../../../../hooks/useFetch';

const FolderMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const location = useLocation();
	const { folder } = queryString.parse(location.search);
	const folderState = useFetch;

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		if (folder) {
			dispatch(retrieveFolder(`/workspace/folder/change/${folder}`));
		}
	}, [folder]);
	const currentFolderData = useSelector((state) => state.folder.currentFolder);
	const [inputForm, setInputForm] = useState({
		name: '',
	});
	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	useEffect(() => {
		if (currentFolderData) {
			setInputForm({ name: currentFolderData.name });
		}
	}, [currentFolderData]);

	const dispatch = useDispatch();
	const { id } = useParams();
	const handleCreateFolder = () => {
		dispatch(addFolder(`/workspace/folder/${id}`, inputForm.name));
	};
	const handleEditFolder = () => {
		dispatch(editFolder(`/workspace/folder/change/${folder}`, inputForm.name));
	};
	const handleDeleteFolder = () => {
		dispatch(deleteFolder(`/workspace/folder/change/${folder}`));
	};

	return (
		<div>
			<Button
				id='basic-button'
				aria-controls='basic-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				variant='outlined'
				endIcon={<KeyboardArrowDownIcon />}
			>
				Folder
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem>
					<DialogComponent
						title='Add Folder'
						button={'Add Folder'}
						action={{ label: 'Create', handler: handleCreateFolder }}
					>
						<TextField
							required
							value={inputForm.name}
							onChange={(e) => onChange(e)}
							name='name'
							label='Folder Name'
							type='text'
							fullWidth
							variant='outlined'
						/>
					</DialogComponent>
				</MenuItem>
				<MenuItem>
					<DialogComponent
						title='Edit Folder'
						button={'Edit Folder'}
						action={{ label: 'Save Edit', handler: handleEditFolder }}
					>
						<TextField
							required
							value={inputForm.name}
							onChange={(e) => onChange(e)}
							name='name'
							label='Folder Name'
							type='text'
							fullWidth
							variant='outlined'
						/>
					</DialogComponent>
				</MenuItem>
				<MenuItem>
					<DialogComponent
						title='Delete Folder'
						button={'Delete Folder'}
						action={{ label: 'Proceed Delete', handler: handleDeleteFolder }}
					>
						<h4>Are you sure you want to delete this folder and its contents?</h4>
					</DialogComponent>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default FolderMenu;
