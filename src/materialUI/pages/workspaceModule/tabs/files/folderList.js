import { Link } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';

const FolderList = ({ folders, link, additionalLink }) => {
	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	const getLink = (val) => {
		if (additionalLink) {
			return `${link}?folder=${val.id}${additionalLink}`;
		}
		return `${link}?folder=${val.id}`;
	};
	return (
		<>
			{folders.length > 0 ? (
				<List
					component='div'
					className='border-2 rounded-md '
					aria-label='main mailbox folders'
					sx={{ minHeight: '350px' }}
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
							to={getLink(val)}
						>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText className='truncate' primary={val.name} />
						</ListItemButton>
					))}
				</List>
			) : (
				<div className='flex justify-center  items-center h-96 border-1'>No folders yet</div>
			)}
		</>
	);
};

export default FolderList;
