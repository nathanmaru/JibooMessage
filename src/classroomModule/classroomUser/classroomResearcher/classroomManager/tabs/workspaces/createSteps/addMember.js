import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
	addWorkspaceMember,
	getAvailableMember,
	getAvailableWorkspace,
} from '../../../../../../../store/workspaceMemberSlice';
import { getMembers } from '../../../../../../../store/classroomMemberSlice';
import useFetch from '../../../../../../../hooks/useFetch';

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

const AddMember = () => {
	const currentWorkspace = useSelector((state) => state.works.currentWorkspace);
	// Fetch Classroom Members
	const { id } = useParams();
	const memberState = useFetch;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAvailableMember(id));
	}, []);
	const fetchedMembers = useSelector((state) => state.worksMember.members);
	const { items: left, setItems: setLeft } = memberState(fetchedMembers);

	const [checked, setChecked] = React.useState([]);
	// const [left, setLeft] = React.useState([{ id: 1, name: 'Jonathan Aplacador' }]); //Fetched Members of the classroom here
	const [right, setRight] = React.useState([]); ///Selected

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};
	const handleAddMember = () => {
		right.map((val) => {
			console.log(val.uid);
			dispatch(addWorkspaceMember(currentWorkspace.id, val.uid));
		});
	};

	const customList = (title, items) => (
		<Card variant='outlined'>
			<CardHeader
				sx={{ px: 2, py: 1 }}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={
							numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{
							'aria-label': 'all items selected',
						}}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List
				sx={{
					width: 300,
					height: 230,
					bgcolor: 'background.paper',
					overflow: 'auto',
				}}
				dense
				component='div'
				role='list'
			>
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value.id}-label`;

					return (
						<ListItem key={value.id} role='listitem' button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								primary={`${value.first_name} ${value.last_name}`}
							/>
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<>
			<Grid container spacing={2} justifyContent='center' alignItems='center'>
				<Grid item>{customList('Available Classroom Members', left)}</Grid>
				<Grid item>
					<Grid container direction='column' alignItems='center'>
						<Button
							sx={{ my: 0.5 }}
							variant='outlined'
							size='small'
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0}
							aria-label='move selected right'
						>
							&gt;
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant='outlined'
							size='small'
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label='move selected left'
						>
							&lt;
						</Button>
					</Grid>
				</Grid>
				<Grid item>{customList('Classroom Member Chosen', right)}</Grid>
			</Grid>
			<div className='flex w-full justify-end pt-4'>
				<Button variant='contained' onClick={handleAddMember}>
					Add Chosen Members
				</Button>
			</div>
		</>
	);
};

export default AddMember;
