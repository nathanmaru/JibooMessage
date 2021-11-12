import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { editProfileCover } from '../store/authSlice';
import ProfilePicture from './profilePicture';
import ProfileInfo from './profileInfo';

const Input = styled('input')({
	display: 'none',
});

const ProfileTop = () => {
	const [cover, setCover] = useState();
	const [profile, setProfile] = useState({
		name: '',
		username: '',
		about: '',
	});
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (user) {
			setCover(user.cover);
			setProfile({
				name: user.name,
				username: user.username,
				about: user.about,
			});
		}
	}, [user]);

	const onChange = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setCover(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		let form_data = new FormData();
		form_data.append('cover', e.target.files[0], e.target.files[0].name);
		form_data.append('first_name', user.first_name);
		form_data.append('last_name', user.last_name);
		form_data.append('email', user.email);
		form_data.append('username', user.username);
		form_data.append('is_verified', user.is_verified);
	};
	return (
		<Card sx={{ maxWidth: '100%' }}>
			<CardMedia
				component='div'
				height='140'
				image={cover}
				alt='green iguana'
				className='flex justify-end items-center'
				sx={{
					minHeight: '300px',
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'end',
				}}
			>
				<label htmlFor='contained-button-file'>
					<Input
						accept='image/*'
						id='contained-button-file'
						onChange={(e) => onChange(e)}
						type='file'
					/>
					<Button
						variant='contained'
						startIcon={<PhotoCamera />}
						style={{
							marginRight: '10px',
							marginBottom: '10px',
							backgroundColor: 'white',
							color: 'rgba(55, 65, 81, 1)',
							textTransform: 'capitalize',
						}}
						component='span'
					>
						Change Cover Photo
					</Button>
				</label>
			</CardMedia>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div>
					<ProfilePicture />
				</div>
				<div className='text-xl font-semibold'>{profile.name}</div>
				<div className='text-sm text-gray-500'>@{profile.username}</div>
				<div className='mt-4 text-base '>{profile.about}</div>

				{/* <ProfileInfo user={user} /> */}
			</CardContent>
		</Card>
	);
};

export default ProfileTop;
