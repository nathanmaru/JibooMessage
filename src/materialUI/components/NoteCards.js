import * as React from 'react';
import { Modal } from '@mui/material';
import NoteCardsModal from './modal/NoteCardsModal';

export default function NoteCards({ item }) {
	const [open, setOpen] = React.useState(false);
	const [note, setNote] = React.useState();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<button type='button ' onClick={handleOpen}>
				<div class='overflow-hidden shadow-lg rounded-lg h-90 w-72 md:w-80 max-w-full cursor-pointer m-5 mt-5 border-2 border-purple-200 hover:bg-blue-200 transition transform hover:-translate-y-1 hover:scale-110'>
					<div class='bg-white dark:bg-gray-800 w-full p-4'>
						<p class='text-gray-800 dark:text-white text-xl font-medium mb-2'>{item.title}</p>
						<p class='text-gray-800 dark:text-white text-justify text-sm mb-5'>
							{item.content}
						</p>

						<div className='flex flex-row justify-between mt-2 border-t-2 items-center border-purple-50'></div>
					</div>
				</div>
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<NoteCardsModal note={item} />
			</Modal>
		</>
	);
}
