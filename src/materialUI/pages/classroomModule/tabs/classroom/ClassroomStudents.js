import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import StudentsTableAdviser from '../../../../components/StudentsTableAdviser';

import { getMembers } from '../../../../../store/classroomMemberSlice';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

// const accords = () => {
// 	return (
// 		<>
// 			<Accordion
// 				expanded={expanded === 'panel1'}
// 				onChange={handleChange('panel1')}
// 				variant='outlined'
// 			>
// 				<AccordionSummary
// 					expandIcon={<ExpandMoreIcon />}
// 					aria-controls='panel1bh-content'
// 					id='panel1bh-header'
// 				>
// 					<Typography
// 						sx={{
// 							width: '33%',
// 							flexShrink: 0,
// 							textTransform: 'uppercase',
// 							color: '#c4b5c9',
// 						}}
// 					>
// 						Official Students
// 					</Typography>
// 				</AccordionSummary>
// 				<AccordionDetails>
// 					{/* <Typography>
// 							Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
// 							feugiat. Aliquam eget maximus est, id dignissim quam.
// 						</Typography> */}
// 					<StudentsTableAdviser data={acceptedMembers} />
// 				</AccordionDetails>
// 			</Accordion>

// 			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
// 				<AccordionSummary
// 					expandIcon={<ExpandMoreIcon />}
// 					aria-controls='panel2bh-content'
// 					id='panel2bh-header'
// 				>
// 					<Typography
// 						sx={{
// 							width: '33%',
// 							flexShrink: 0,
// 							textTransform: 'uppercase',
// 							color: '#c4b5c9',
// 						}}
// 					>
// 						Requests
// 					</Typography>
// 				</AccordionSummary>
// 				<AccordionDetails>
// 					<StudentsTableAdviser actions={true} data={pendingMembers} />
// 				</AccordionDetails>
// 			</Accordion>
// 		</>
// 	);
// };
export default function ClassroomStudents({ location, id }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const [rows, setRows] = useState([]);
	const dispatch = useDispatch();
	const { members } = useSelector((state) => state.classMember);
	console.log(location);

	useEffect(() => {
		dispatch(getMembers(id));
	}, []);
	useEffect(() => {
		if (members) {
			setRows(members);
		}
	}, [members]);
	const acceptedMembers = rows.filter((row) => row.status === 'accepted');
	const pendingMembers = rows.filter((row) => row.status === 'pending');

	return (
		<>
			<div>
				<StudentsTableAdviser data={acceptedMembers} />
			</div>
		</>
	);
}
