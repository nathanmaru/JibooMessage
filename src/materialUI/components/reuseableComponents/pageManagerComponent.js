import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { Link, Switch, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

const PageManagerComponent = ({ tabs, value, handleChange }) => {
	const location = useLocation();
	const { tab } = queryString.parse(location.search);
	return (
		<>
			<TabContext value={value}>
				<Box component='div' sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						{tabs.map((val) => (
							<Tab component={Link} to={val.link} label={val.label} value={val.value} />
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
