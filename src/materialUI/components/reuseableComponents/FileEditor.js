import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import InputBase from '@mui/material/InputBase';
import ViewToggleButton from './viewModeToggleButton';
import DropDownComponent from './dropdownComponent';
import QuillEditor from './quillEditor';
import { useQuill } from 'react-quilljs';
import AccordionComponent from './accordionComponent';
import { useHistory, useLocation } from 'react-router';

const FileEditor = ({ formData, onChange, fetchedFile, setContent, getUpdate }) => {
	const history = useHistory();

	const buttons = [
		{
			label: 'Default View',
			value: 'default',
		},
		{
			label: 'Focus View',
			value: 'focus',
		},
	];

	// Status dropdown
	const options = [
		{ label: 'Draft', value: 'draft' },
		{ label: 'Publish', value: 'published' },
	];

	// quill
	const [i, setI] = useState(0);
	const modules = {
		toolbar: [
			[{ font: [] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ align: [] }],

			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ indent: '-1' }, { indent: '+1' }],

			// [{ size: ['small', false, 'large', 'huge'] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			['link', 'image', 'video', 'blockquote', 'code-block'],
			[{ color: [] }, { background: [] }],
		],
		clipboard: {
			matchVisual: false,
		},
	};

	const placeholder = 'Compose an epic...';
	const theme = 'snow';
	const { quill, quillRef } = useQuill({ placeholder, theme, modules });

	useEffect(() => {
		if (quill) {
			quill.on('text-change', (delta, oldDelta, source) => {
				setContent(quill.root.innerHTML);
				getUpdate(quill.root.innerHTML);
			});
		}
	}, [quill]);
	useEffect(() => {
		if (fetchedFile && i === 0) {
			quill.clipboard.dangerouslyPasteHTML(fetchedFile.content);
			quill.setSelection(quill.getLength(), 0);
			setI(1);
		}
	}, [fetchedFile]);

	return (
		<>
			<div className='grid grid-rows-6 gap-1'>
				<div className='row-span-1  grid grid-cols-3 gap-4'>
					<div className='col-span-2 flex space-x-2 items-center'>
						<IconButton aria-label='back' size='large' onClick={() => history.goBack()}>
							<FiArrowLeftCircle fontSize='inherit' />
						</IconButton>
						<div>
							<InputBase
								sx={{
									flex: 1,
									fontSize: '1.5rem',
									lineHeight: '2rem',
									fontWeight: 700,
								}}
								name='name'
								placeholder='File Name'
								value={formData.name}
								onChange={onChange}
								size='medium'
								inputProps={{ 'aria-label': 'search google maps' }}
							/>
						</div>
					</div>
					<div className='col-span-1 grid grid-cols-3 gap-2'>
						<div className='col-span-1 flex items-center '>
							<DropDownComponent
								label='Status'
								name='status'
								value={formData.status}
								options={options}
								handleChange={onChange}
							/>
						</div>
						<div className='col-span-2 flex justify-end items-center'>
							<ViewToggleButton
								name='view'
								view={formData.view}
								handleChange={onChange}
								buttons={buttons}
							/>
						</div>
					</div>
				</div>
				<div className='row-span-5 grid grid-cols-3 gap-4'>
					<div className='col-span-2'>
						<QuillEditor quillRef={quillRef} />
					</div>
					<div className=' col-span-1'>
						<AccordionComponent label='Comments'>
							<div>Comments Here</div>
						</AccordionComponent>
						<AccordionComponent label='Notes'>
							<div>Notes Here</div>
						</AccordionComponent>
						<AccordionComponent label='Videos'>
							<div>Videos Here</div>
						</AccordionComponent>
						<AccordionComponent label='Tips'>
							<div>Tips</div>
						</AccordionComponent>
					</div>
				</div>
			</div>
		</>
	);
};

export default FileEditor;

// Handle the UI of File Editor Page
