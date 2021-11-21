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
	const fetchedFile = useSelector((state) => state.file.currentFile);
	const [status, setStatus] = useState('draft');
	useEffect(() => {
		if (fetchedFile) {
			setStatus(fetchedFile.status);
		}
	}, [fetchedFile]);

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Status</InputLabel>
				<Select name='status' value={status} label='Status' sx={{ height: '45px' }}>
					<MenuItem value='draft'>Draft</MenuItem>
					<MenuItem value='published'>Publish</MenuItem>
				</Select>
			</FormControl>
		</>
	);
};

export default StatusDropDown;
