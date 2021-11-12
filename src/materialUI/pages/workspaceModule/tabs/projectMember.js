import MemberCard from '../../../components/memberCard';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMembers } from '../../../../store/workspaceMemberSlice';

const ProjectMember = () => {
	// hooks
	const location = useLocation();
	const dispatch = useDispatch();

	// states
	const [members, setMembers] = useState([]);

	// query string
	const { workspace } = queryString.parse(location.search);

	// get states
	const memberFetch = useSelector((state) => state.worksMember.members);

	// set states
	useEffect(() => {
		if (memberFetch) {
			setMembers(memberFetch);
		}
	}, [memberFetch]);

	// fetch api

	useEffect(() => {
		if (workspace) {
			dispatch(getMembers(workspace));
		}
	}, []);

	return (
		<>
			{members.length > 0 ? (
				<div className='flex flex-row w-full flex-wrap'>
					{members.map((val) => (
						<MemberCard member={val} />
					))}
				</div>
			) : (
				'No members yet'
			)}
		</>
	);
};

export default ProjectMember;
