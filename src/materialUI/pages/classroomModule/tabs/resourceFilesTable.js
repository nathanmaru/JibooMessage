import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import {
	getFiles,
	getUploadedFiles,
	deleteFile,
	deleteUploadFile,
} from '../../../../store/classResourceSlice';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const ResourceFilesTable = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	// states
	const [files, setFiles] = useState([]);
	const [uploadFiles, setUploadFiles] = useState([]);

	// queryString
	const { folder } = queryString.parse(location.search);

	// fetch files
	useEffect(() => {
		dispatch(getFiles(folder));
		dispatch(getUploadedFiles(folder));
	}, [folder]);

	// get state
	const fetchFiles = useSelector((state) => state.resource.files);
	const fetchUploadFiles = useSelector((state) => state.resource.uploadFiles);

	// set state

	useEffect(() => {
		if (fetchFiles) {
			setFiles(fetchFiles);
		}
	}, [fetchFiles]);
	useEffect(() => {
		if (fetchUploadFiles) {
			setUploadFiles(fetchUploadFiles);
		}
	}, [fetchUploadFiles]);

	// events
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
		if (val.hasOwnProperty('content')) {
			dispatch(deleteFile(val.id));
			console.log('a quill');
		} else if (val.hasOwnProperty('file')) {
			dispatch(deleteUploadFile(val.id));
			console.log('uploaded file');
		}
	};
	return (
		<>
			<TableContainer component={'div'}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Title </TableCell>
							<TableCell align='center'>Status</TableCell>
							<TableCell align='center'>Tags</TableCell>
							<TableCell align='center'>Assignee</TableCell>
							<TableCell align='center'>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ minHeight: '300px' }}>
						{files.map((val, key) => (
							<TableRow
								key={val.id}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
								}}
							>
								<TableCell component='th' scope='row'>
									{val.name}
								</TableCell>
								<TableCell align='center'>{val.status}</TableCell>
								<TableCell align='center'>{val.tags}</TableCell>
								<TableCell align='center'>{val.assignee_name}</TableCell>
								<TableCell align='center'>
									<OpenInNewIcon
										onClick={() => handMeID(val)}
										className='cursor-pointer hover:text-purple-400'
									/>{' '}
									<DeleteIcon
										onClick={() => delete_File(val)}
										className='cursor-pointer hover:text-purple-400'
									/>
								</TableCell>
							</TableRow>
						))}{' '}
						{uploadFiles.map((val, key) => (
							<TableRow
								key={val.id}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
								}}
							>
								<TableCell component='th' scope='row'>
									{val.name}
								</TableCell>
								<TableCell align='center'>{val.status}</TableCell>
								<TableCell align='center'>{val.tags}</TableCell>
								<TableCell align='center'>{val.assignee_name}</TableCell>
								<TableCell align='center'>
									<OpenInNewIcon
										onClick={() => handMeID(val)}
										className='cursor-pointer hover:text-purple-400'
									/>{' '}
									<DeleteIcon
										onClick={() => delete_File(val)}
										className='cursor-pointer hover:text-purple-400'
									/>
								</TableCell>
							</TableRow>
						))}{' '}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ResourceFilesTable;
