import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../../../hooks/useFetch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router';
import { getDepartments } from '../../../../../../store/departmentSlice';
import { publishArticle } from '../../../../../../store/articleSlice';

const PublicationDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDepartments(id));
	}, []);
	const submissionDetail = useSelector((state) => state.submission.currentSubmission);
	const fetchedDepartment = useSelector((state) => state.department.departments);
	const pubState = useFetch;
	const deptState = useFetch;

	const { items: departments } = deptState(fetchedDepartment);
	const [inputForm, setInputForm] = useState({
		title: '',
		authors: '',
		abstract: '',
		department: '',
		isFeatured: false,
	});

	useState(() => {
		if (submissionDetail) {
			let authors;
			if (submissionDetail.authorsUploadFile) {
				authors = submissionDetail.authorsUploadFile;
			}
			if (submissionDetail.authorsFile) {
				authors = submissionDetail.authorsFile;
			}
			setInputForm({
				...inputForm,
				title: submissionDetail.title,
				abstract: submissionDetail.description,
				authors: getAuthors(authors),
			});
		}
	}, [submissionDetail]);

	function onChange(e) {
		if (e.target.name === 'isFeatured') {
			setInputForm({ ...inputForm, isFeatured: e.target.checked });
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	}

	function getAuthors(authors) {
		let authorCombine;

		authors.map((val) => {
			authorCombine = authorCombine + `${val.first_name} ${val.last_name}, `;
		});

		return authorCombine;
	}
	function handlePublish() {
		console.log(inputForm);
		let formData = new FormData();
		formData.append('title', inputForm.title);
		formData.append('abstract', inputForm.abstract);
		formData.append('department', inputForm.department);
		formData.append('isFeatured', inputForm.isFeatured);
		if (submissionDetail.uploadFile) {
			formData.append('file', submissionDetail.uploadFile);
		}

		dispatch(publishArticle(`post/${id}`, formData));
	}

	return (
		<>
			<div className='flex  w-full justify-center items-center'>
				<div className='flex flex-col w-4/5 space-y-4 '>
					<TextField
						fullWidth
						label='Article Title'
						variant='outlined'
						value={inputForm.title}
						name='title'
						onChange={onChange}
					/>
					<TextField
						fullWidth
						label='Author(s)'
						variant='outlined'
						value={inputForm.authors}
						name='authors'
						InputProps={{
							readOnly: true,
						}}
						onChange={onChange}
					/>
					<TextField
						fullWidth
						label='Abstract'
						variant='outlined'
						value={inputForm.abstract}
						multiline
						minRows={6}
						name='abstract'
						onChange={onChange}
					/>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Department</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							label='Department'
							value={inputForm.department}
							onChange={onChange}
							name='department'
						>
							{departments.map((val) => (
								<MenuItem value={val.id}>{val.name}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControlLabel
						control={<Checkbox />}
						value={inputForm.isFeatured}
						onChange={onChange}
						name='isFeatured'
						label='Do you want this article be Featured?'
					/>
					<div className='flex  w-full'>
						<Button onClick={handlePublish} variant='contained'>
							Publish Article
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default PublicationDetail;
