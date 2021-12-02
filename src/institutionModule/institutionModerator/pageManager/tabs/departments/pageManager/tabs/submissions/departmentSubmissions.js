import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../../../hooks/useFetch';
import { getSubmissions } from '../../../../../../../../store/submissionSlice';

const DepartmentSubmissions = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const submissionsState = useFetch;
	useEffect(() => {
		dispatch(getSubmissions(`/submission/?search=${id}`));
	}, []);
	const fetchedSubmissions = useSelector((state) => state.submission.submissions);
	const { items: submissions, setItems: setSubmissions } = submissionsState(fetchedSubmissions);

	// note to thania gamita ang submissions para i map ang mga submissions
	return null;
};

export default DepartmentSubmissions;
