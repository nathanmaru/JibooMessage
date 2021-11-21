import { useEffect, useState } from 'react';
import DropDownComponent from '../../../../../../../../../../materialUI/components/reuseableComponents/dropdownComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../../../../../hooks/useFetch';
import { retrieveFile } from '../../../../../../../../../../store/newFileSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StatusDropDown = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const fetchedFile = useSelector((state) => state.file.currentFile);
	const [status, setStatus] = useState('draft');
	useEffect(() => {
		if (fetchedFile) {
			setStatus(fetchedFile.status);
		}
	}, [fetchedFile]);
	const onChange = (e) => {
		setStatus(e.target.value);
		// put dispatch here
	};
	const options = [
		{ label: 'Draft', value: 'draft' },
		{ label: 'Publish', value: 'published' },
	];
	return (
		<>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Status</InputLabel>
				<Select
					name='status'
					value={status}
					label='Status'
					onChange={onChange}
					sx={{ height: '45px' }}
				>
					<MenuItem value='draft'>Draft</MenuItem>
					<MenuItem value='published'>Publish</MenuItem>
				</Select>
			</FormControl>
		</>
	);
};

export default StatusDropDown;
