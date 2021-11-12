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
import { useParams, Route } from 'react-router';
import queryString from 'query-string';

const ClassroomManager = ({ match, location }) => {
	const { classTab } = queryString.parse(location.search);
	const [value, setValue] = useState(classTab);
	const { id } = match.params;

	const handleChange = (event, newValue) => {
		setValue(newValue);
		localStorage.setItem('tab', newValue);
	};

	return (
		<>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab
							label='Dashboard'
							value='dashboard'
							component={Link}
							to={`/classroom/adviser/${id}?classTab=dashboard`}
						/>
						{/* <LinkTab label='Resources' href='/classroom/resource' /> */}
						<Tab
							label='Resources'
							value='resources'
							component={Link}
							to={`/classroom/adviser/${id}?classTab=resources`}
						/>
						<Tab
							label='Students'
							value='students'
							component={Link}
							to={`/classroom/adviser/${id}?classTab=students`}
						/>
						<Tab
							label='Workspaces'
							value='workspaces'
							component={Link}
							to={`/classroom/adviser/${id}?classTab=workspaces`}
						/>
					</TabList>
				</Box>
				<TabPanel value='dashboard'>
					<ClassroomDashboard match={match} location={location} />
				</TabPanel>
				<TabPanel value='resources'>
					<ClassroomResources />
				</TabPanel>

				<TabPanel value='students'>
					<ClassroomStudents id={id} isResearcher={false} />
				</TabPanel>
				<TabPanel value='workspaces'>Workspaces</TabPanel>
			</TabContext>
		</>
	);
};

export default ClassroomManager;
