import React, { useEffect, useState, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import { FiArrowLeftCircle } from 'react-icons/fi';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Home from './home';
import TempDefault from './TempDefault';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveFile, editFile } from '../store/classResourceSlice';
import queryString from 'query-string';
// import Quill from 'quill';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import '../index.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

export default function TempFile({ location }) {
	const [mode, setMode] = useState('default');

	const handleChange = (event, newMode) => {
		if (newMode !== null) {
			setMode(newMode);
		}
	};

	const dispatch = useDispatch();
	const [status, setStatus] = useState('draft');
	const handleChangeStatus = (event) => {
		setStatus(event.target.value);
	};

	const [fileName, setFileName] = useState('');
	const [fileContent, setFileContent] = useState(null);

	const { fileID, viewmode } = queryString.parse(location.search);
	const { currentFile } = useSelector((state) => state.resource);
	console.log(viewmode);
	useEffect(() => {
		dispatch(retrieveFile(fileID));
	}, []);
	useEffect(() => {
		if (currentFile) {
			setFileName(currentFile.name);
			setFileContent(currentFile.content);
			// setFileData({ name: currentFile.name, content: currentFile.content });
		}
	}, [currentFile]);
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
	const formats = [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['bold', 'italic', 'underline'],
		[{ color: [] }, { background: [] }],
		[{ script: 'sub' }, { script: 'super' }],
		[{ align: [] }],
		['image', 'blockquote', 'code-block'],
		['clean'],
	];
	const { Quill, quill, quillRef } = useQuill({ placeholder, theme, modules });

	React.useEffect(() => {
		if (quill) {
			// Default value

			quill.on('text-change', (delta, oldDelta, source) => {
				// console.log(quill.root.innerHTML); // Get innerHTML using quill
				// getContent = quill.root.innerHTML;
				setFileContent(quill.root.innerHTML);
			});
		}
	}, [quill, viewmode]);
	const [i, setI] = useState(0);

	useEffect(() => {
		if (fileContent && i === 0) {
			quill.clipboard.dangerouslyPasteHTML(fileContent);
			quill.setSelection(quill.getLength(), 0);
			setI(1);
		}
	}, [fileContent]);
	useEffect(() => {
		if (fileContent) {
			// Update File
			dispatch(editFile(fileID, fileName, fileContent));
			console.log(fileContent);
			console.log(i);
		}
	}, [fileContent]);
	return (
		<>
			<div class='grid grid-cols-3 gap-4'>
				<div class='flex items-center p-1'>
					{/* <div className="w-12 h-12 flex items-center justify-center p-2 rounded-full border border-purple-200"> */}
					<IconButton aria-label='back' size='large'>
						<FiArrowLeftCircle fontSize='inherit' />
					</IconButton>
					{/* </div> */}
					<div className='ml-1'>
						{/* <TextField
							id='standard-size-normal'
							value={fileData.name}
							variant='standard'
							size='1.5rem'
							sx={{ borderStyle: 'hidden', fontSize: '1.5rem', lineHeight: '2rem' }}
						/> */}
						<p className='text-xl font-semibold'> {fileName}</p>
					</div>
				</div>
				<div class='col-span-2 flex flex-row justify-between items-center p-1'>
					<div className='justify-start flex items-center ml-auto'>
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Status</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={status}
									label='Status'
									onChange={handleChangeStatus}
									sx={{ width: 150, height: 50, mr: 1 }}
								>
									<MenuItem value={'draft'}>Draft</MenuItem>
									<MenuItem value={'published'}>Published</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>

					<div className='justify-between'>
						<div class='flex w-full justify-end'>
							<ToggleButtonGroup
								color='primary'
								value={mode}
								exclusive
								onChange={handleChange}
								sx={{ borderRadius: '15px' }}
							>
								<ToggleButton
									component={Link}
									to='/temp?fileID=7&viewmode=default'
									value='default'
								>
									Default View
								</ToggleButton>
								<ToggleButton
									component={Link}
									to='/temp?fileID=7&viewmode=focus'
									value='focus'
								>
									Focus Mode
								</ToggleButton>
							</ToggleButtonGroup>
						</div>
					</div>
				</div>
			</div>
			{viewmode === 'default' ? (
				<div className='mt-1'>
					<div class='grid grid-cols-3 gap-4'>
						<div className='col-span-2' style={{ minWidth: 500, height: '450px' }}>
							<div ref={quillRef} />
						</div>

						<div
							class='flex flex-col p-2 rounded-lg overflow-y-auto'
							style={{ minHeight: '600px', maxHeight: '600px' }}
						>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel1a-content'
									id='panel1a-header'
								>
									<Typography
										sx={{
											fontWeight: 600,
											letterSpacing: '1px',
										}}
									>
										Comments
									</Typography>
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
										malesuada lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel2a-content'
									id='panel2a-header'
								>
									<Typography
										sx={{
											fontWeight: 600,
											letterSpacing: '1px',
										}}
									>
										Notes
									</Typography>
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
										malesuada lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel2a-content'
									id='panel2a-header'
								>
									<Typography
										sx={{
											fontWeight: 600,
											letterSpacing: '1px',
										}}
									>
										Videos
									</Typography>
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
										malesuada lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel2a-content'
									id='panel2a-header'
								>
									<Typography
										sx={{
											fontWeight: 600,
											letterSpacing: '1px',
										}}
									>
										Pro Tips
									</Typography>
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
										malesuada lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				</div>
			) : null}
			{viewmode === 'focus' ? <Home /> : null}
		</>
	);
}
