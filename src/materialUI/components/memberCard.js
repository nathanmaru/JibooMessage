import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';

const MemberCard = ({ member }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const removeMember = (id) => {
		console.log(id);
	};
	return (
		<>
			<Card raised sx={{ maxWidth: '300px', borderRadius: '1rem' }}>
				<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
					<div className='flex w-full justify-end'>
						<MoreVertIcon
							className='cursor-pointer'
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						/>
						{/* </Button> */}
					</div>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleClose}>Edit</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose();
								removeMember(member.id);
							}}
						>
							Remove
						</MenuItem>
					</Menu>
					<Avatar
						alt='Remy Sharp'
						src={`http://localhost:8000/media/${member.picture}`}
						sx={{ height: '100px', width: '100px' }}
					/>
					<Typography className='text-gray-800' gutterBottom variant='h6' component='div'>
						{member.firstname} {member.lastname}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{member.username}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default MemberCard;
