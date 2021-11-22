import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../hooks/useFetch';
import BannerComponent from '../../../../../../materialUI/components/reuseableComponents/bannerComponent';
import CardComponent from '../../../../../../materialUI/components/reuseableComponents/cardComponent';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import DialogStepperComponent from '../../../../../../materialUI/components/reuseableComponents/dialogStepperComponent';
import { getWorkspaces } from '../../../../../../store/workspaceSlice';
import AddMember from './createSteps/addMember';
import WorkspaceDetail from './createSteps/workspaceDetails';

const ResearcherWorkspaceTab = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const workspaceState = useFetch;

	useEffect(() => {
		dispatch(getWorkspaces(`/workspace/${id}`));
	}, []);
	const fetchedWorkspace = useSelector((state) => state.works.workspaces);
	const { items: workspaces, setItems: setWorkspaces } = workspaceState(fetchedWorkspace);
	const createProject = () => {};
	const handleJoinProject = () => {};
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		code: '',
	});
	const onChange = (e) => {};

	const steps = [
		{
			label: 'Workspace Details',
			component: <WorkspaceDetail />,
		},
		{
			label: 'Add Members',
			component: <AddMember />,
		},
	];

	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				<BannerComponent
					title='Welcome to Project Workspace!'
					subtitle='Create and collaborate with your fellow researchers.'
				>
					<div className='flex space-x-2'>
						{/* Create Project */}
						<DialogStepperComponent
							button='Create Project'
							title='Create Project Workspace'
							context='Start your research journey today!'
							maxWidth='md'
							steps={steps}
						></DialogStepperComponent>
						{/* Join Project */}
						<DialogComponent
							button={<Button variant='contained'>Join Project</Button>}
							title='Join Project Workspace'
							maxWidth='sm'
							action={{ label: 'Join', handler: handleJoinProject }}
						>
							<div class='flex flex-col p-4 space-y-4'>
								<TextField
									required
									label='Workspace Code'
									type='text'
									fullWidth
									variant='outlined'
									name='code'
									value={formData.code}
									onChange={(e) => onChange(e)}
								/>
							</div>
						</DialogComponent>
					</div>
				</BannerComponent>
				<CardHolder>
					{workspaces.map((item) => (
						<CardComponent
							item={item}
							image={item.cover}
							link={`/classroom/researcher/workspace/${item.id}?tab=dashboard`}
						/>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default ResearcherWorkspaceTab;
