import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
// import ResourcesFiles from '../../../../pages/resourcesFiles';
import ResourcesFolders from '../tabs/resourceFolders';
import ResourceDashboard from '../tabs/resourceDashboard';
import { useState, useEffect } from 'react';
import { Link, Switch } from 'react-router-dom';
import queryString from 'query-string';

const ClassroomResourceManager = ({ match, location }) => {
	const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
		localStorage.setItem('resourcetab', newValue);
	};
	useEffect(() => {
		if (localStorage.getItem('resourcetab')) {
			setValue(localStorage.getItem('resourcetab'));
		}
	}, []);
	const { resource } = queryString.parse(location.search);
	console.log(resource);

	return (
		<>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab
							label='Dashboard'
							component={Link}
							to={`/classroom/adviser/resources/dashboard/?resource=${resource}`}
							value='1'
						/>
						<Tab
							label='Contents'
							component={Link}
							to={`/classroom/adviser/resources/contents/?resource=${resource}`}
							value='2'
						/>
						<Tab
							label='Subscriptions'
							component={Link}
							to={`/classroom/adviser/resources/subscriptions/?resource=${resource}`}
							value='3'
						/>
					</TabList>
				</Box>
				<TabPanel value='1'>
					<ResourceDashboard />
				</TabPanel>
				<TabPanel value='2'>
					<ResourcesFolders />
				</TabPanel>
				<TabPanel value='3'>Subscriptions</TabPanel>
			</TabContext>
		</>
	);
};

export default ClassroomResourceManager;
