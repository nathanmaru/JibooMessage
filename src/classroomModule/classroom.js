import { useState } from 'react';
import queryString from 'query-string';
import { Link, Route, useLocation } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import ClassroomResearcher from './classroomUser/classroomResearcher/classroomResearcher';
import ClassroomAdviser from './classroomUser/classroomAdviser/classroomAdviser';

const Classroom = () => {
	const location = useLocation();
	const { ref } = queryString.parse(location.search);

	const [mode, setMode] = useState(ref);

	const handleChange = (event, newMode) => {
		if (newMode !== null) {
			setMode(newMode);
		}
	};

	return (
		<>
			<div className='flex w-full justify-end'>
				<ToggleButtonGroup color='primary' value={mode} exclusive onChange={handleChange}>
					<ToggleButton
						component={Link}
						to='/classroom?ref=researcher&navTab=classroom'
						value='researcher'
					>
						Researcher Mode
					</ToggleButton>
					<ToggleButton
						component={Link}
						to='/classroom?ref=adviser&navTab=classroom'
						value='adviser'
					>
						Adviser Mode
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
			{ref === 'researcher' ? <ClassroomResearcher /> : null}
			{ref === 'adviser' ? <ClassroomAdviser /> : null}
		</>
	);
};

export default Classroom;
