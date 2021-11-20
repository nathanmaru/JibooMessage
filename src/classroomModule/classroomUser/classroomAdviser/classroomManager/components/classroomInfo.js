import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Button,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import FeedBackButton from '../../../../../hooks/feedBackButton';

const ClassroomInfo = () => {
	return (
		<>
			<div className='grid grid-cols-2 gap-4 mt-4'>
				<div className='flex flex-col space-y-3'>
					<Card sx={{ maxWidth: '100%' }}>
						<CardMedia
							component='div'
							image={inputForm.cover}
							className='flex justify-end items-center'
							sx={{
								height: '190px',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'end',
							}}
						>
							<label htmlFor='contained-button-file'>
								<Input
									accept='image/*'
									id='contained-button-file'
									name='cover'
									onChange={onChange}
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
					</Card>
					<TextField
						label='Classroom Name'
						variant='outlined'
						name='name'
						value={inputForm.name}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className=' flex flex-col space-y-3 '>
					<TextField
						label='Subject'
						variant='outlined'
						name='subject'
						value={inputForm.subject}
						onChange={(e) => onChange(e)}
					/>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Privacy</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={inputForm.privacy}
							label='Privacy'
							name='privacy'
							onChange={(e) => onChange(e)}
						>
							<MenuItem value={'public'}>Public</MenuItem>
							<MenuItem value={'private'}>Private</MenuItem>
						</Select>
					</FormControl>
					<TextField
						label='Description'
						variant='outlined'
						name='description'
						value={inputForm.description}
						onChange={(e) => onChange(e)}
						multiline
						minRows={4}
					/>
					<div className='flex justify-end'>
						<FeedBackButton
							button={
								<LoadingButton
									onClick={handleClassroomDetail}
									loading={loading}
									type='submit'
									variant='contained'
								>
									Create Classroom
								</LoadingButton>
							}
							status={status}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClassroomInfo;
