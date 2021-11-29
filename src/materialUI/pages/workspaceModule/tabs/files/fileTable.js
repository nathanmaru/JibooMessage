import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import Tooltip from '@mui/material/Tooltip';

const FileTable = ({ files, uploadFiles, handMeID, delete_File, handleSubmit, submitButton }) => {
	const contents = [...files];

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
											<div className='flex space-x-4 justify-center '>
												<Tooltip title='Open File'>
													<OpenInNewIcon
														onClick={() => handMeID(val)}
														className='cursor-pointer hover:text-purple-400'
													/>
												</Tooltip>{' '}
												{delete_File ? (
													<Tooltip title='Delete'>
														<DeleteIcon
															onClick={() => delete_File(val)}
															className='cursor-pointer hover:text-purple-400'
														/>
													</Tooltip>
												) : null}
												{handleSubmit ? (
													<Tooltip title='Make Submission'>
														<span onClick={() => handleSubmit(val)}>
															{submitButton ? submitButton : null}
														</span>
													</Tooltip>
												) : null}
											</div>
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
