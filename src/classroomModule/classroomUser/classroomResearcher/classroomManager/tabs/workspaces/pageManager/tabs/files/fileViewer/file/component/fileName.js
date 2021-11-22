import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { IconButton, InputBase } from '@mui/material';
import { FiArrowLeftCircle } from 'react-icons/fi';

const FileName = () => {
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const fetchedFile = useSelector((state) => state.file.currentFile);
	const [name, setName] = useState('');
	useEffect(() => {
		if (fetchedFile) {
			setName(fetchedFile.name);
		}
	}, [fetchedFile]);
	const onChange = (e) => {
		setName(e.target.value);
		// put dispatch here
	};
	return (
		<>
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
					value={name}
					onChange={onChange}
					size='medium'
					inputProps={{ 'aria-label': 'search google maps' }}
				/>
			</div>
		</>
	);
};

export default FileName;
