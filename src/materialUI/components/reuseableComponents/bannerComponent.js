import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const BannerComponent = (props) => {
	const { image, title, subtitle } = props;
	const defaultImage =
		'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

	return (
		<>
			<Card sx={{ borderRadius: '0.75rem' }}>
				<CardMedia
					component='div'
					height='345'
					image={image ? image : defaultImage}
					alt='green iguana'
				>
					<div className='grid grid-cols-4 gap-2 w-full h-full p-6'>
						<div className='col-span-3 flex flex-col justify-between space-y-2'>
							<h3 className='text-3xl font-bold tracking-wider'>{title}</h3>
							<h5 className='text-sm tracking-wider text-gray-600'>{subtitle}</h5>
						</div>
						<div className='col-span-1 flex justify-end items-center space-x-3 '>
							{props.children}
						</div>
					</div>
				</CardMedia>
			</Card>
		</>
	);
};

export default BannerComponent;
