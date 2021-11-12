import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { useState, useEffect } from 'react';
import ClassroomDashboard from '../../../../pages/ClassroomDashboard';
import ClassroomStudents from '../tabs/classroom/ClassroomStudents';
import ClassroomResources from '../../../../pages/classroomResources';
import { Link, Switch } from 'react-router-dom';
import { useParams, Route, useLocation } from 'react-router';
import queryString from 'query-string';
import PageManagerComponent from '../../../components/reuseableComponents/pageManagerComponent';

const ClassroomManagerResearcher = () => {
	const location = useLocation();
	const { tab } = queryString.parse(location.search);
	const { id } = useParams();

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = [
		{
			label: 'Dashboard',
			link: `/classroom/researcher/${id}?tab=dashboard`,
			value: 'dashboard',
			component: <ClassroomDashboard id={id} />,
		},
		{
			label: 'Resources',
			link: `/classroom/researcher/${id}?tab=resources`,
			value: 'resources',
			component: <ClassroomResources />,
		},
		{
			label: 'Students',
			link: `/classroom/researcher/${id}?tab=students`,
			value: 'students',
			component: <ClassroomStudents id={id} isResearcher={true} />,
		},
	];

	return (
		<>
			<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
		</>
	);
};

export default ClassroomManagerResearcher;
