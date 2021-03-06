import { Button, Card, Dialog, DialogActions, DialogTitle, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { HiOutlineClock } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import useFetch from '../../../../../hooks/useFetch';
import DialogComponent from '../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { getSubmissions } from '../../../../../store/submissionSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ModeratorInstitutionSubmission = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const submissionsState = useFetch;
	const history = useHistory();

	useEffect(() => {
		dispatch(getSubmissions(`submission${id}`));
	}, []);
	const fetchedSubmissions = useSelector((state) => state.submission.submissions);
	const { items: submissions, setItems: setSubmissions } = submissionsState(fetchedSubmissions);

	const handleClickOpen = (itemId) => {
		history.push(`/institutions/moderator/submission/${itemId}`);
	};
	const [submissionStatus, setSubmissionStatus] = useState('pending');

	const handleChange = (event) => {
		setSubmissionStatus(event.target.value);
	};
	return (
		<>
			<div className='flex w-full justify-end mb-4'>
				<div className='flex w-56'>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Submission Status</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={submissionStatus}
							label='Submission Status'
							onChange={handleChange}
						>
							<MenuItem value={'pending'}>Pending</MenuItem>
							<MenuItem value={'revision'}>Revision</MenuItem>
							<MenuItem value={'accepted'}>Accepted</MenuItem>
							<MenuItem value={'published'}>Published</MenuItem>
							<MenuItem value={'rejected'}>Rejected</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
			<div className='px-1 overflow-y-auto' style={{ maxHeight: '600px', minHeight: '600px' }}>
				{/* Cards Here */}
				{submissions.map((item) => {
					if (item.institutionResponse === submissionStatus) {
						return (
							<Card
								item={item}
								sx={{
									maxHeight: 180,
									minHeight: 180,
									border: 1,
									borderColor: '#d4d4d4',
									mb: 1,
									p: 2,
								}}
							>
								<div className='flex justify-end'>
									<DialogComponent
										title={item.title}
										button={
											<Button
												variant='contained'
												onClick={() => handleClickOpen(item.id)}
											>
												View Submission
											</Button>
										}
									></DialogComponent>
								</div>
								<div className='flex justify-between items-center'>
									<p className='text-3xl tracking-wider font-semibold'>{item.title}</p>
									<p className='text-xs text-gray-400'>{item.date}</p>
								</div>
								<p
									className='text-sm tracking-wider truncate'
									style={{
										maxHeight: '40px',
										minHeight: '40px',
										maxWidth: '1210px',
										minWidth: '1210px',
										padding: 5,
									}}
								>
									{item.abstract}
								</p>
								<div className='mt-2 px-2 flex space-x-2'>
									<div className='flex items-center space-x-1'>
										<CgFileDocument className='text-gray-500' />
										<p className='text-sm text-gray-500'>Workspace Name ???</p>
										<p className='text-xs text-purple-500'>{item.workspace} </p>
									</div>
									<div className='flex items-center space-x-1'>
										<HiOutlineClock className='text-gray-500' />
										<p className='text-sm text-gray-500'>Status ???</p>
										<p className='text-xs text-purple-500'>{item.status} </p>
									</div>
								</div>
							</Card>
						);
					}
				})}
			</div>
		</>
	);
};

export default ModeratorInstitutionSubmission;
