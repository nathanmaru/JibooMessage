import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { Link, Switch, useLocation, useParams } from 'react-router-dom';

const PageManagerComponent = ({ tabs, value, handleChange }) => {
	return (
		<>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						{tabs.map((tab) => (
							<Tab component={Link} to={tab.link} label={tab.label} value={tab.value} />
						))}
					</TabList>
				</Box>
				{tabs.map((tab) => (
					<TabPanel value={tab.value}>{tab.component}</TabPanel>
				))}
			</TabContext>
		</>
	);
};

export default PageManagerComponent;
