import { Doughnut } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const data = {
	labels: ['Storage Used', 'Storage Left'],
	datasets: [
		{
			label: 'Storage Data',
			data: [34, 19],
			fill: false,
			backgroundColor: ['#904CB3', '#D2B6E0'],
			borderColor: ['#904CB3', '#D2B6E0'],
			borderWidth: 1,
			hoverOffset: 2,
			cutout: '80%',
			options: {
				animation: {
					animateScale: true,
				},
			},
		},
	],
};
const ClassroomDashboard = () => {
	return (
		<>
			<Card variant='outlined' sx={{ maxWidth: '20%' }}>
				<CardContent>
					<p className='text-lg text-center text-gray-400 mb-1'>Storage Data</p>
					<Doughnut data={data} />
				</CardContent>
			</Card>
		</>
	);
};

export default ClassroomDashboard;
