import React from 'react';
import Banner from '../components/Banner';
import ClassroomCards from '../components/classroomCards';

import SortingTools from '../components/sortingTools';
import { getClassroom } from '../store/classroomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ClassroomResearcher from '../materialUI/pages/classroomModule/tabs/classroom/Researcher/ClassroomResearcher';
import queryString from 'query-string';
import { Link, Route } from 'react-router-dom';
import ClassroomAdviser from '../materialUI/pages/classroomModule/tabs/classroom/Adviser/ClassroomAdviser';

const Classroom = ({ location }) => {
	const { ref } = queryString.parse(location.search);

	const [mode, setMode] = useState(ref);

	const handleChange = (event, newMode) => {
		if (newMode !== null) {
			setMode(newMode);
		}
	};

	return (
		<>
			<div class='flex w-full justify-end'>
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
