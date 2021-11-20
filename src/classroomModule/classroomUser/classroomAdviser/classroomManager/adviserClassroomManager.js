import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { useState, useEffect } from 'react';
import { Link, Switch, useLocation } from 'react-router-dom';
import { useParams, Route } from 'react-router';
import queryString from 'query-string';

const AdviserClassroomManager = () => {
	const location = useLocation();
	const { classTab } = queryString.parse(location.search);
	const [value, setValue] = useState(classTab);
	const { id } = match.params;

	const handleChange = (event, newValue) => {
		setValue(newValue);
		localStorage.setItem('tab', newValue);
	};
	return null;
};

export default AdviserClassroomManager;
