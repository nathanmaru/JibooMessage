import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const CardComponent = ({ item, link, image, height, onClick }) => {
	const defaultImage =
		'https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

	return (
		<>
			<Card
				key={item.id}
				component={link ? Link : 'div'}
				to={link ? link : null}
				sx={{
					width: '18.75rem',
					marginBottom: '1.5rem',
					marginRight: '1.5rem',
					height: height ? height : '18.375rem',
					borderRadius: '0.75rem',
				}}
				onClick={onClick ? onClick : null}
				raised
				className='transition transform hover:-translate-y-1 cursor-pointer'
			>
				<CardMedia
					component='img'
					image={image ? image : defaultImage}
					alt='green iguana'
					sx={{ height: '150px' }}
				/>
				<CardContent>
					<Typography gutterBottom variant='h6' component='div'>
						{item.name}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{item.description}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default CardComponent;
