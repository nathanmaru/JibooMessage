import { Link, useLocation } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getFolders } from '../../../../store/classResourceSlice';

const ResourceFolderList = () => {
	// hooks
	const dispatch = useDispatch();
	const location = useLocation();

	// states

	const [folders, setFolders] = useState([]);

	const [selectedIndex, setSelectedIndex] = useState(0);

	// query string
	const { resource, folder } = queryString.parse(location.search);

	// fetching from api
	useEffect(() => {
		dispatch(getFolders(resource));
	}, []);

	// get state
	const fetchFolders = useSelector((state) => state.resource.folders);

	// set state
	useEffect(() => {
		if (fetchFolders) {
			setFolders(fetchFolders);
		}
	}, [fetchFolders]);

	return (
		<>
			{folders.length > 0 ? null : (
				<div className='flex justify-center items-center h-96 border-1'>No folders yet</div>
			)}
			<List
				component='div'
				className=' border-2 rounded-md '
				aria-label='main mailbox folders'
				sx={{ minHeight: '400px' }}
			>
				{folders.map((val) => (
					<ListItemButton
						dense
						selected={folder == val.id}
						component={Link}
						sx={{
							display: 'flex',
							justifyContent: 'center',
						}}
						to={`/classroom/adviser/resources/contents/?resource=${resource}&folder=${val.id}`}
					>
						<ListItemIcon>
							<FolderIcon />
						</ListItemIcon>
						<ListItemText className='truncate' primary={val.name} />
					</ListItemButton>
				))}
			</List>
		</>
	);
};

export default ResourceFolderList;
