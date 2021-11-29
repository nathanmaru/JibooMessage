import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import DialogComponent from '../../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { TextField } from '@mui/material';
import queryString from 'query-string';
import { useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addFile, getfiles } from '../../../../../../../../../../store/newFileSlice';
import useFetch from '../../../../../../../../../../hooks/useFetch';
const Input = styled('input')({
	display: 'flex',
});

const FileMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [inputForm, setInputForm] = useState({
		name: '',
		file: null,
	});
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == 'file') {
			setInputForm({ ...inputForm, file: e.target.files[0] });
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	};

	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	const dispatch = useDispatch();

	const handleCreateFile = () => {
		let formData = new FormData();
		formData.append('name', inputForm.name);
		formData.append('content', '<h1>Welcome to Meegu!</h1>');
		dispatch(addFile(`/workspace/file/${folder}`, formData));
	};
	const handleUploadFile = () => {
		console.log(inputForm.file);
		let formData = new FormData();
		formData.append('file', inputForm.file, inputForm.file.name);
		formData.append('name', inputForm.file.name);
		console.log(formData);
		dispatch(addFile(`/workspace/file/${folder}`, formData));
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
				File
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
					{/* <label htmlFor='icon-button-file'>
						<Input accept='application/pdf' id='icon-button-file' type='file' />
						Upload File
					</label> */}
					<DialogComponent
						title='Upload File'
						button={'Upload File'}
						action={{ label: 'Upload', handler: handleUploadFile }}
					>
						<input
							accept='application/pdf'
							onChange={onChange}
							name='file'
							id='icon-button-file'
							type='file'
						/>
					</DialogComponent>
				</MenuItem>
				<MenuItem>
					<DialogComponent
						title='Create File'
						button={'Create File'}
						action={{ label: 'Create', handler: handleCreateFile }}
					>
						<TextField
							required
							value={inputForm.name}
							onChange={(e) => onChange(e)}
							name='name'
							label='File Name'
							type='text'
							fullWidth
							variant='outlined'
						/>
					</DialogComponent>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default FileMenu;
