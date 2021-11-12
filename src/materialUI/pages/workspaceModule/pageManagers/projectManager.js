import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import ProjectDashboard from '../tabs/projectDashboard';
import ProjectMember from '../tabs/projectMember';
import ProjectFiles from '../tabs/files/projectFiles';
import PageManagerComponent from '../../../components/reuseableComponents/pageManagerComponent';

const ProjectManager = () => {
	// hooks and query strings
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
			link: `/works/${id}?tab=dashboard`,
			value: 'dashboard',
			component: <ProjectDashboard id={id} />,
		},
		{
			label: 'Members',
			link: `/works/${id}?tab=members`,
			value: 'members',
			component: <ProjectMember />,
		},
		{
			label: 'Files',
			link: `/works/${id}?tab=files`,
			value: 'files',
			component: <ProjectFiles />,
		},
	];

	return (
		<>
			<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
		</>
	);
};

export default ProjectManager;
