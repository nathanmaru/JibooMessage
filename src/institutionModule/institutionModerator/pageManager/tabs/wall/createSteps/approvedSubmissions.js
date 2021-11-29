import { Card, CardContent, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../hooks/useFetch';
import { getSubmissions, selectSubmission } from '../../../../../../store/submissionSlice';
import Checkbox from '@mui/material/Checkbox';

const ApprovedSubmissions = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const approvedSubmissionState = useFetch;
	useEffect(() => {
		dispatch(getSubmissions(`/submission/institution/${id}?search=accepted`));
	}, []);
	const fetchedSubmissions = useSelector((state) => state.submission.submissions);
	const { items: submissions, setItems: setSubmission } =
		approvedSubmissionState(fetchedSubmissions);
	const [checked, setChecked] = useState(0);
	const handleClick = (val) => {
		dispatch(selectSubmission(val));
		setChecked(val.id);
	};

	return (
		<>
			<div className='flex flex-col space-y-4 w-full'>
				{submissions.map((val) => (
					<Card variant='outlined' sx={{ width: '100%', height: '100px' }}>
						<CardActionArea
							onClick={() => handleClick(val)}
							sx={{ width: '100%', height: '100%' }}
						>
							<CardContent>
								<div className='flex space-x-4 items-center '>
									<Checkbox
										checked={checked == val.id}
										inputProps={{ 'aria-label': 'controlled' }}
									/>
									<div>
										<div>{val.title}</div>
										<div>{val.description}</div>
									</div>
								</div>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</div>
		</>
	);
};

export default ApprovedSubmissions;
