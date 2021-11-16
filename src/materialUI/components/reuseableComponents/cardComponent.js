import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';

const CardComponent = (props) => {
	const { item, link, image, height, width, onClick } = props;
	const defaultImage =
		'https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
	console.log(props.children);
	return (
		<>
			<Card
				key={item.id}
				component={link ? Link : 'div'}
				to={link ? link : null}
				sx={{
					width: width ? width : '18.75rem',
					marginBottom: '1.5rem',
					marginRight: '1.5rem',
					height: height ? height : '18.375rem',
					borderRadius: '0.75rem',
				}}
				onClick={onClick ? onClick : null}
				raised
				className='transition transform hover:-translate-y-1 cursor-pointer'
			>
				{image ? (
					<CardMedia
						component='img'
						image={image ? image : defaultImage}
						alt='green iguana'
						sx={{ height: '150px' }}
					/>
				) : null}

				<CardContent>{props.children}</CardContent>
			</Card>
		</>
	);
};

export default CardComponent;
