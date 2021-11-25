import { Avatar, Card, CardContent, Menu, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useFetch from '../../../../../../../../../hooks/useFetch';
import { useEffect } from 'react';
import { getMembers } from '../../../../../../../../../store/memberSlice';

const ResearcherWorkspaceMemberTab = () => {
	const { id } = useParams();
	const memberStates = useFetch;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMembers(`/workspace/members/${id}`));
	}, []);
	const fetchedMembers = useSelector((state) => state.member.members);
	const { items: members, setItems: setMembers } = memberStates(fetchedMembers);
	return (
		<>
			<div className='flex flex-row space-x-4 w-full  mt-2'>
				{members.map((member) => (
					<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
						<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
							<Avatar
								alt='Remy Sharp'
								src={member.image}
								sx={{ height: '100px', width: '100px', border: '1px solid #808080' }}
							/>
							<div>
								<p className='text-gray-800 font-semibold text-lg'>{member.name}</p>
							</div>
							<Typography variant='body2' color='text.secondary'>
								@{member.username}
							</Typography>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
};

export default ResearcherWorkspaceMemberTab;
