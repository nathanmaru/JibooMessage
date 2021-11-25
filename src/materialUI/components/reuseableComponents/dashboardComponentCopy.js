import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
const Input = styled('input')({
	display: 'none',
});
const ProductDetailComponent = (props) => {
	const { product, cover } = props;
	const defaultImage =
		'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

	// console.log(product.coverFile);
	return (
		<>
			<Card variant='outlined' sx={{ maxWidth: '100%' }}>
				<CardMedia
					component='div'
					image={cover ? cover : product.cover}
					sx={{
						height: '190px',
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'end',
					}}
				></CardMedia>
				<CardContent>{props.children}</CardContent>
			</Card>
		</>
	);
};

export default ProductDetailComponent;
