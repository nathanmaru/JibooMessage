import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ActionButtons from './actionButton';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SwitchMode from './switchMode';
import GroupedAvatar from './groupedAvatar';
import { People } from './dummyPeople';
import FolderList from './folderList';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import FileTable from './fileTable';
import {
	loadWorkspaceFolders,
	createWorkspaceFolder,
	editWorkspaceFolder,
	deleteWorkspaceFolder,
	uploadFile,
	getUploadedFiles,
	deleteUploadFile,
	getQuillFiles,
	deleteQuillFile,
	createQuillFile,
} from '../../../../../store/fileManagerSlice';
import DialogComponent from '../../../../components/reuseableComponents/dialogComponent';
import { IconButton, Tooltip } from '@mui/material';
import { AiFillFileAdd } from 'react-icons/ai';

const Input = styled('input')({
	display: 'none',
});

const ProjectFiles = ({ match }) => {
	// hooks
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	// states
	const [formData, setFormData] = useState({
		file: null,
		name: '',
	});

	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name === 'file') {
			setFormData({ file: e.target.files[0] });
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	// dialogs
	const [open, setOpen] = React.useState({
		newFolderDialog: false,
		newFileDialog: false,
		editFolderDialog: false,
	});

	const handleClickOpen = (type) => {
		switch (type) {
			case 1:
				setOpen({ newFolderDialog: true });
				break;
			case 2:
				setOpen({ newFileDialog: true });
				break;
			case 3:
				setOpen({ editFolderDialog: true });
				break;
			default:
				break;
		}
	};

	const handleClose = (type) => {
		switch (type) {
			case 1:
				setOpen({ newFolderDialog: false });
				break;
			case 2:
				setOpen({ newFileDialog: false });
				break;
			case 3:
				setOpen({ editFolderDialog: false });
				break;
		}
	};

	// Switch Mode
	const [checked, setChecked] = useState(true);
	const [label, setLabel] = useState('Group');

	const handleChange = (event) => {
		setChecked(event.target.checked);
		if (!event.target.checked) {
			setLabel('You');
		} else {
			setLabel('Group');
		}
	};

	// folders

	const [folders, setFolders] = useState([]);
	const { folder } = queryString.parse(location.search);

	const { id } = useParams(); // workspace id

	const fetchFolders = useSelector((state) => state.fileManager.folders);

	useEffect(() => {
		dispatch(loadWorkspaceFolders(id));
	}, []);

	useEffect(() => {
		if (fetchFolders) {
			setFolders(fetchFolders);
		}
	}, [fetchFolders]);

	const handleCreateFolder = () => {
		dispatch(createWorkspaceFolder(id, formData.name));
	};

	const handleEditFolder = () => {
		dispatch(editWorkspaceFolder(folder, formData.name));
	};

	const handleDeleteFolder = () => {
		dispatch(deleteWorkspaceFolder(folder));
	};

	// files
	const [files, setFiles] = useState([]);
	const [uploadFiles, setUploadFiles] = useState([]);
	const fetchedUploadedFiles = useSelector((state) => state.fileManager.uploadedFiles);
	const fetchedQuillFiles = useSelector((state) => state.fileManager.quillFiles);
	useEffect(() => {
		if (folder) {
			//fetch uploaded
			dispatch(getUploadedFiles(folder));
			dispatch(getQuillFiles(folder));
		}
	}, [folder]);

	useEffect(() => {
		if (fetchedUploadedFiles) {
			setUploadFiles(fetchedUploadedFiles);
		}
	}, [fetchedUploadedFiles]);
	useEffect(() => {
		if (fetchedQuillFiles) {
			setFiles(fetchedQuillFiles);
		}
	}, [fetchedQuillFiles]);
	const handMeID = (val) => {
		console.log(val);
		if (val.hasOwnProperty('content')) {
			history.push('/temp?fileID=' + val.id + '&viewmode=default');
			console.log('a quill');
		} else if (val.hasOwnProperty('file')) {
			history.push('/fileViewer?filePath=' + val.file);
			console.log('uploaded file');
		}
	};
	const delete_File = (val) => {
		console.log(val);
		if (val.hasOwnProperty('content')) {
			dispatch(deleteQuillFile(val.id));
			console.log('a quill');
		} else if (val.hasOwnProperty('file')) {
			dispatch(deleteUploadFile(val.id));
			console.log('uploaded file');
		}
	};
	const handleCreateFile = () => {
		console.log(formData.name);
		dispatch(createQuillFile(formData.name, folder));
	};
	useEffect(() => {
		if (formData.file !== null) {
			let form_data = new FormData();
			form_data.append('file', formData.file, formData.file.name);
			form_data.append('name', formData.file.name);
			form_data.append('folder', folder);
			console.log(form_data, 'file', formData.file);
			dispatch(uploadFile(form_data));
		}
	}, [formData.file]);

	return (
		<>
			<div className='grid grid-rows-7 grid-flow-row gap-2  min-w-full'>
				<div className=''>
					<div className='grid grid-cols-6 gap-4 max-h-20'>
						<div>
							<ActionButtons
								newFolder={
									<DialogComponent
										button={
											<IconButton
												component='span'
												color='primary'
												aria-label='New Folder'
												sx={{
													border: 1,
													borderRadius: 1,
													'&:hover': { boxShadow: 5 },
												}}
											>
												<CreateNewFolderIcon />
											</IconButton>
										}
										title='Create New Folder'
										context="Reminder: To name your folder descriptively so that your students can
						easily find what's in them."
										action={{ label: 'Create', handler: handleCreateFolder }}
									>
										<TextField
											autoFocus
											margin='dense'
											required
											value={formData.name}
											onChange={(e) => onChange(e)}
											name='name'
											label='Folder Name'
											type='text'
											fullWidth
											variant='standard'
										/>
									</DialogComponent>
								}
								newWorkspace={
									<DialogComponent
										button={
											<IconButton
												color='primary'
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
										}
										title='Create New Workspace File'
										context="Piece of Advice: You don't have to pull everything together at first. Work your research piece by piece."
										open={open.newFileDialog}
										handleClose={() => handleClose(2)}
										handleClickOpen={() => handleClickOpen(2)}
										action={{ label: 'Create', handler: handleCreateFile }}
									>
										<TextField
											autoFocus
											margin='normal'
											required
											value={formData.name}
											onChange={(e) => onChange(e)}
											name='name'
											label='Workspace File Name'
											type='text'
											fullWidth
											variant='outlined'
										/>
									</DialogComponent>
								}
								editFolder={
									<DialogComponent
										button='Edit Folder'
										title='Edit Folder'
										context={
											<>
												<b>Reminder:</b> To name your folder descriptively so that your
												students can easily find what's in them.
											</>
										}
										action={{ label: 'Edit', handler: handleEditFolder }}
									>
										<TextField
											autoFocus
											margin='normal'
											required
											value={formData.name}
											onChange={(e) => onChange(e)}
											name='name'
											label='Folder Name'
											type='text'
											fullWidth
											variant='outlined'
										/>
									</DialogComponent>
								}
								onDelete={handleDeleteFolder}
								onChange={onChange}
							/>
						</div>
						<div className='col-span-3 flex items-center'>
							<Typography
								variant='h5'
								component='h2'
								sx={{ fontWeight: 'fontWeightMedium' }}
							>
								Project Name
							</Typography>
						</div>
						<div className='col-span-2 flex justify-end items-center space-x-4'>
							<SwitchMode label={label} checked={checked} handleChange={handleChange} />
							<GroupedAvatar people={People} />
						</div>
					</div>
				</div>
				<div className='row-span-4 grid grid-cols-6 gap-4'>
					<div>
						<FolderList folders={folders} folder={folder} link={`/works/${id}?tab=files`} />
					</div>
					<div className=' col-span-5 border-2 rounded-md'>
						<FileTable
							files={files}
							uploadFiles={uploadFiles}
							handMeID={handMeID}
							delete_File={delete_File}
						/>
					</div>
				</div>
				<div className='row-span-2'></div>
			</div>
		</>
	);
};

export default ProjectFiles;
