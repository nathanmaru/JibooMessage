import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../../hooks/useFetch';

import BannerComponent from '../../../materialUI/components/reuseableComponents/bannerComponent';
import CardComponent from '../../../materialUI/components/reuseableComponents/cardComponent';
import CardHolder from '../../../materialUI/components/reuseableComponents/cardHolder';
import DialogComponent from '../../../materialUI/components/reuseableComponents/dialogComponent';
import { getStudentClassroom, joinClassroom } from '../../../store/newClassroomSlice';

const ClassroomResearcher = () => {
	const dispatch = useDispatch();
	const classroomState = useFetch;
	const [code, setCode] = useState('');
	const onChange = (e) => {
		setCode(e.target.value);
	};
	useEffect(() => {
		dispatch(getStudentClassroom());
	}, []);
	const fetchedClassrooms = useSelector((state) => state.newClass.classes);
	const { items: classrooms, setItems: setClassrooms } = classroomState(fetchedClassrooms);
	// const [classrooms, setClassrooms] = useState([]);
	const handleSubmit = () => {
		dispatch(joinClassroom(code));
	};
	return (
		<>
			<div class='flex flex-col w-full p-4 space-y-4'>
				<BannerComponent
					title=' Hello there, Researcher !'
					subtitle='Check what is happening in your classrooms:'
				>
					<DialogComponent
						title='Join Classroom'
						button={<Button variant='contained'>Join Classroom</Button>}
						action={{ label: 'Join', handler: handleSubmit }}
					>
						<div className='mt-4'>
							<TextField
								fullWidth
								id='outlined-search'
								label='Code'
								variant='outlined'
								name='code'
								value={code}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</DialogComponent>
				</BannerComponent>
				<CardHolder>
					{classrooms && classrooms.length > 0 ? (
						<>
							{classrooms.map((item) => (
								<CardComponent
									key={item.id}
									item={item}
									image={item.cover}
									link={`/classroom/researcher/${item.id}?tab=dashboard`}
								></CardComponent>
							))}
						</>
					) : (
						<div>You don't have a classroom yet.</div>
					)}
				</CardHolder>
			</div>
		</>
	);
};

export default ClassroomResearcher;
