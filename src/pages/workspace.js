import { useSelector, useDispatch } from 'react-redux';
import { getWorkspaces, createWorkspace } from '../store/workspaceSlice';
import { joinWorkspace, getSharedWorkspace } from '../store/workspaceMemberSlice';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardComponent from '../materialUI/components/reuseableComponents/cardComponent';
import CardHolder from '../materialUI/components/reuseableComponents/cardHolder';
import BannerComponent from '../materialUI/components/reuseableComponents/bannerComponent';
import DialogComponent from '../materialUI/components/reuseableComponents/dialogComponent';

const WorkSpace = () => {
	// hooks
	const dispatch = useDispatch();

	// states
	const [items, setItems] = useState([]);
	const [sharedWorkspace, setSharedWorkspace] = useState([]);
	const [open, setOpen] = useState({
		createProjectDialog: false,
		joinProjectDialog: false,
	});
	const [form, setForm] = useState({
		name: '',
		description: '',
		code: '',
	});

	const { name, description, code } = form;

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleClickOpen = (type) => {
		switch (type) {
			case 1:
				setOpen({ createProjectDialog: true });
				break;
			case 2:
				setOpen({ joinProjectDialog: true });
				break;
		}
	};

	const handleClose = (type) => {
		switch (type) {
			case 1:
				setOpen({ createProjectDialog: false });
				break;
			case 2:
				setOpen({ joinProjectDialog: false });
				break;
		}
	};

	const { workspace } = useSelector((state) => state.works);
	const fetchSharedWorkspace = useSelector((state) => state.worksMember.sharedWorkspace);
	const owner = useSelector((state) => state.auth.user);
	useEffect(() => {
		dispatch(getWorkspaces());
		dispatch(getSharedWorkspace());
	}, []);

	useEffect(() => {
		if (workspace) {
			setItems(workspace);
		}
	}, [workspace]);
	useEffect(() => {
		if (fetchSharedWorkspace) {
			setSharedWorkspace(fetchSharedWorkspace);
		}
	}, [fetchSharedWorkspace]);

	const createProject = () => {
		dispatch(createWorkspace(name, description, owner.id));
	};
	const handleJoinProject = () => {
		dispatch(joinWorkspace(code));
	};

	return (
		<>
			<div class='flex flex-col w-full p-4 space-y-4'>
				<BannerComponent
					title='Welcome to Project Workspace!'
					subtitle='Create and collaborate with your fellow researchers.'
				>
					<div className='flex space-x-2'>
						{/* Create Project */}
						<DialogComponent
							button={<Button variant='contained'>Create Project</Button>}
							title='Create Project Workspace'
							context='Start your research journey today!'
							open={open.createProjectDialog}
							handleClose={() => handleClose(1)}
							maxWidth='md'
							action={{ label: 'Create', handler: createProject }}
						>
							<div class='flex flex-col p-4 space-y-4'>
								<TextField
									required
									id='name'
									label='Project Name'
									type='text'
									fullWidth
									variant='outlined'
									name='name'
									value={name}
									onChange={(e) => onChange(e)}
								/>
								<TextField
									label='Description'
									fullWidth
									variant='outlined'
									multiline
									minRows={4}
									name='description'
									value={description}
									onChange={(e) => onChange(e)}
								/>
							</div>
						</DialogComponent>
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
									value={code}
									onChange={(e) => onChange(e)}
								/>
							</div>
						</DialogComponent>
					</div>
				</BannerComponent>

				<CardHolder>
					{items.map((item) => (
						<CardComponent item={item} link={`/works/${item.id}?tab=dashboard`} />
					))}
					{sharedWorkspace.map((item) => (
						<CardComponent item={item} link={`/works/${item.id}?tab=dashboard`} />
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default WorkSpace;
