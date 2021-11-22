import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyVerification } from '../../../store/newInstitutionSlice';
const Input = styled('input')({
	display: 'none',
});

const InstitutionVerification = () => {
	const dispatch = useDispatch();
	const currentInstitution = useSelector((state) => state.institution.currentInstitution);
	const defaultImage =
		'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
	const [inputForm, setInputForm] = useState({
		file: defaultImage,
		previewFile: defaultImage,
	});
	const onChange = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let resFile = e.target.files[0];

		reader.onloadend = () => {
			setInputForm({
				...inputForm,
				previewFile: resFile,
				file: reader.result,
			});
		};
		reader.readAsDataURL(resFile);
	};
	const handleVerify = () => {
		const { previewFile } = inputForm;
		let form_data = new FormData();
		form_data.append('document', previewFile, previewFile.name);
		dispatch(applyVerification(currentInstitution.id, form_data));
	};
	return (
		<div className='w-full pt-4 flex flex-col justify-center items-center'>
			<div className='flex flex-col w-4/5 space-y-4'>
				<Card variant='outlined' sx={{ maxWidth: '100%' }}>
					<CardMedia
						component='img'
						image={inputForm.file}
						className='flex justify-end items-center'
						sx={{
							height: '250px',
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'end',
						}}
					></CardMedia>
				</Card>
				<div className='flex w-full justify-center space-x-6'>
					<label htmlFor='contained-button-file'>
						<Input
							accept='image/*'
							id='contained-button-file'
							name='cover'
							onChange={onChange}
							type='file'
						/>
						<Button variant='outlined' startIcon={<PhotoCamera />} component='span'>
							Select File
						</Button>
					</label>
					<Button variant='contained' onClick={handleVerify}>
						Upload File
					</Button>
				</div>
			</div>
		</div>
	);
};

export default InstitutionVerification;
