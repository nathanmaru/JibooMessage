import { Avatar, Card, CardContent, Menu, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useFetch from '../../../../../../hooks/useFetch';
import { useEffect } from 'react';
import { getMembers } from '../../../../../../store/classroomMemberSlice';
const ResearcherClassroomStudentTab = () => {
	const { id } = useParams();
	const studentStates = useFetch;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMembers(`/classroom/member/list/?search=${id}`));
	}, []);
	const fetchedStudents = useSelector((state) => state.classMember.members);
	const { items: members, setItems: setMembers } = studentStates(fetchedStudents);

	return (
		<>
			<div className='flex flex-row space-x-4 w-full  mt-2'>
				{members.map((member) => (
					<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
						<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
							<Avatar
								alt='Remy Sharp'
								src={member.user.profileImage}
								sx={{ height: '100px', width: '100px', border: '1px solid #808080' }}
							/>
							<div className='flex flex-col w-full justify-center items-center space-y-1'>
								<Typography
									className='text-gray-800'
									gutterBottom
									variant='p'
									component='div'
								>
									{member.user.full_name}
								</Typography>
							</div>
							<Typography variant='body1' color='text.primary'>
								{member.role}
							</Typography>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
};

export default ResearcherClassroomStudentTab;
