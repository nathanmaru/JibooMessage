import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ArticleCards = ({ article, button, retrieveID }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div class='flex min-w-full p-4'>
				<Card raised sx={{ display: 'flex', width: '1000px', maxHeight: '500px' }}>
					<CardMedia
						component='img'
						sx={{ width: 200 }}
						image='https://images.pexels.com/photos/4584832/pexels-photo-4584832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
						alt='Live from space album cover'
					/>
					<CardContent
						className='flex flex-col justify-center items-center '
						sx={{ width: '800px' }}
					>
						<div className='flex w-full justify-between items-center'>
							<p className='bg-purple-200 text-purple-600 text-xs flex justify-center tracking-wider w-24 p-1 rounded-full'>
								Case Study
							</p>
							{button}
						</div>
						<Link
							to={`/about-article/${retrieveID}`}
							className='flex justify-start flex-col w-full space-y-3'
						>
							<div className=''>
								<p className='text-gray-800 text-lg lg:text-3xl tracking-wider px-1 font-semibold  '>
									{article.title}
								</p>
							</div>
							<div>
								<div className='max-h-36 overflow-y-auto'>
									<p className='text-gray-800 text-xs lg:text-sm px-1 w-full '>
										{article.publisher}
									</p>
								</div>
								<div className='max-h-36 overflow-y-auto'>
									<p className='text-gray-800 text-xs lg:text-sm px-1 w-full '>
										{article.author}
									</p>
								</div>
							</div>
						</Link>
					</CardContent>
				</Card>
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
				<MenuItem
					onClick={() => {
						handleClose();
					}}
				>
					Add To Library
				</MenuItem>
			</Menu>
		</>
	);
};

export default ArticleCards;
