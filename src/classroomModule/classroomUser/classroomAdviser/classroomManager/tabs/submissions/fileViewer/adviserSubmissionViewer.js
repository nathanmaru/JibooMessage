import { Button } from '@mui/material';
import 'quill/dist/quill.bubble.css';
import { useEffect } from 'react';
import { MdOutlinePlagiarism, MdOutlineSpeakerNotes } from 'react-icons/md';
import { useQuill } from 'react-quilljs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../../hooks/useFetch';
import { retrieveSubmission } from '../../../../../../../store/submissionSlice';

const AdviserSubmissionViewer = () => {
	const theme = 'bubble';
	const { id } = useParams();
	const dispatch = useDispatch();
	const submissionState = useFetch;
	useEffect(() => {
		dispatch(retrieveSubmission(`submission/classroom/change/${id}`));
	}, []);
	const fetchedSubmission = useSelector((state) => state.submission.currentSubmission);
	const { items: submission, setItems: setSubmission } = submissionState(fetchedSubmission);

	const modules = {
		toolbar: [['bold', 'italic', 'underline', 'strike']],
	};

	const placeholder = 'Compose an epic...';
	const commentPlaceholder = 'Type your comment here...';

	const formats = ['bold', 'italic', 'underline', 'strike'];

	const { quillRef: contentQuill } = useQuill({ theme, modules, formats, placeholder });
	const { quillRef: commentQuill } = useQuill({
		theme,
		modules,
		formats,
		placeholder: commentPlaceholder,
	});
	return (
		<>
			<div className='grid grid-rows-6 w-full  gap-4 mb-6'>
				<div className='row-span-1 grid  grid-cols-5 gap-4'>
					<div className='col-span-3  flex flex-col space-y-2'>
						<h6 className='font-extrabold text-xl text-gray-700'>{submission.title}</h6>

						<div className='flex space-x-4'>
							by:
							{submission.authors ? (
								<>
									{submission.authors.map((author) => (
										<p className='font-base text-gray-700 text-md'>
											{author.first_name} {author.last_name},
										</p>
									))}
								</>
							) : null}
							<p>-</p>
							<p className='font-medium text-gray-700 text-md'>Workspace</p>
						</div>
					</div>
					<div className='col-span-2  flex justify-end items-center space-x-4'>
						<div>
							<Button variant='contained'>Accept</Button>
						</div>
						<div>
							<Button variant='contained' color='secondary'>
								Call For Revision
							</Button>
						</div>
						<div>
							<Button variant='contained' color='error'>
								Reject
							</Button>
						</div>
					</div>
				</div>
				<div className='row-span-5  grid  grid-cols-5 gap-4'>
					<div className='col-span-3  flex flex-col space-y-4'>
						<div
							style={{
								width: '100%',
								height: '400px',
								border: '1px solid lightgray',
							}}
						>
							<div ref={contentQuill} />
						</div>
					</div>
					<div className='col-span-2 flex flex-col space-y-4'>
						<div
							style={{
								width: '100%',
								height: '100px',

								border: '1px solid lightgray',
								borderRadius: '1rem',
							}}
						>
							<div ref={commentQuill} />
						</div>
						<div className='flex flex-col h-full space-y-1'>
							<div className='flex justify-between border-b-2 space-x-2 '>
								<p className='overflow-clip'>Comment</p>

								<p>11/12/2021 9:30am</p>
							</div>
							<div className='flex justify-between border-b-2 space-x-2 '>
								<p className='overflow-clip'>Comment</p>

								<p>11/12/2021 9:30am</p>
							</div>
							<div className='flex justify-between border-b-2 space-x-2 '>
								<p className='overflow-clip'>Comment</p>

								<p>11/12/2021 9:30am</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdviserSubmissionViewer;
