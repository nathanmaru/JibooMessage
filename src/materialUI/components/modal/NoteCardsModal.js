import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateNote, deleteNote } from '../../../store/noteSlice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	height: 600,
	borderRadius: '10px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default function NoteCardsModal({ note }) {
	const [noteForm, setForm] = React.useState({
		id: '',
		title: '',
		content: '',
	});

	const { id, title, content } = noteForm;
	const onChange = (e) => setForm({ ...noteForm, [e.target.name]: e.target.value });
	const dispatch = useDispatch();

	React.useState(() => {
		setForm({
			id: note.id,
			title: note.title,
			content: note.content,
		});
	}, [note]);

	const handleSave = () => {
		dispatch(updateNote(title, content, note.owner, id));
	};

	const handleDelete = () => {
		dispatch(deleteNote(id));
	};

	return (
		<>
			<Box sx={style}>
				<TextField
					id='standard-search'
					label='Title'
					variant='standard'
					value={title}
					name='title'
					onChange={(e) => onChange(e)}
					sx={{
						width: '445px',
						marginBottom: '3px',
						marginTop: '5px',
						padding: '2px',
						fontWeight: 'bold',
					}}
				/>
				<TextField
					multiline
					rows={18}
					value={content}
					name='content'
					label='Content'
					onChange={(e) => onChange(e)}
					variant='standard'
					sx={{
						width: '445px',
						marginBottom: '20px',
					}}
				/>
				<Button
					variant='contained'
					sx={{
						marginBottom: 'auto',
					}}
					onClick={handleSave}
				>
					<p className='mr-auto text-sm justify-between'> Save Edit</p>
				</Button>
				<Button
					sx={{
						marginBottom: 'auto',
					}}
					onClick={handleDelete}
				>
					<p className='ml-2 mr-auto text-sm justify-between'> Delete</p>
				</Button>
			</Box>
		</>
	);
}
