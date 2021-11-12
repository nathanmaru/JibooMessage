import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';

const FileTable = ({ files, uploadFiles, handMeID, delete_File }) => {
	const contents = [...files, ...uploadFiles];
	console.log(contents.length);
	return (
		<>
			<TableContainer component={'div'}>
				{contents.length > 0 ? (
					<>
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
								{contents.map((val) => (
									<TableRow key={val.id}>
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
								))}
							</TableBody>
						</Table>
					</>
				) : (
					<div className='flex w-full h-72 justify-center items-center'>No files Here Yet</div>
				)}
			</TableContainer>
		</>
	);
};

export default FileTable;
