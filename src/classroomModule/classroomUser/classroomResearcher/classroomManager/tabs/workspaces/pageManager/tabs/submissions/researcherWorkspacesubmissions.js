import { Button, Card, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { HiOutlineClock } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import useFetch from '../../../../../../../../../hooks/useFetch';
import CardHolder from '../../../../../../../../../materialUI/components/reuseableComponents/cardHolder';
import DialogComponent from '../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { getSubmissions } from '../../../../../../../../../store/submissionSlice';

const ResearcherWorkspaceSubmissions = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const submissionState = useFetch;
	useEffect(() => {
		dispatch(getSubmissions(`/submission/workspace/${id}`));
	}, []);
	const fetchedSubmissions = useSelector((state) => state.submission.submissions);
	const { items: submissions, setItems: setSubmissions } = submissionState(fetchedSubmissions);
	const handleCheckup = (item) => {
		console.log(item);
		history.push(`/classroom/researcher/workspace/file/${item.file}`);
	};
	return (
		<>
			<CardHolder>
				{submissions.map((item) => (
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
								button={<Button variant='contained'>Check Submission</Button>}
							>
								<div className='flex flex-col space-y-4 mt-4'>
									<TextField
										label='Workspace Name'
										variant='outlined'
										name='title'
										value={item.title}
									/>
									<TextField
										label='Description'
										variant='outlined'
										name='description'
										value={item.description}
										multiline
										minRows={4}
									/>
									<div className='flex w-full justify-end'>
										<Button variant='contained' onClick={() => handleCheckup(item)}>
											Proceed Chekup File
										</Button>
									</div>
								</div>
							</DialogComponent>
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
							{item.description}
						</p>
						<div className='mt-2 px-2 flex space-x-2'>
							<div className='flex items-center space-x-1'>
								<CgFileDocument className='text-gray-500' />
								<p className='text-sm text-gray-500'>Workspace Name ●</p>
								<p className='text-xs text-purple-500'>{item.workspace} </p>
							</div>
							<div className='flex items-center space-x-1'>
								<HiOutlineClock className='text-gray-500' />
								<p className='text-sm text-gray-500'>Status ●</p>
								<p className='text-xs text-purple-500'>{item.status} </p>
							</div>
						</div>
					</Card>
				))}
			</CardHolder>
		</>
	);
};

export default ResearcherWorkspaceSubmissions;
