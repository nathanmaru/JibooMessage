import PageManagerComponent from '../../components/reuseableComponents/pageManagerComponent';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import ManageInstitution from './ManageInstitution';

const Institution = () => {
	// hooks and query strings
	const location = useLocation();

	const { ref } = queryString.parse(location.search);
	console.log(ref);
	const { id } = useParams();

	const [value, setValue] = useState(ref);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = [
		{
			label: 'Managing',
			link: `/institutions?ref=managing`,
			value: 'managing',
			component: <ManageInstitution />,
		},
		{
			label: 'Joined',
			link: `/institutions?ref=joined`,
			value: 'joined',
			component: <div>Joined</div>,
		},
	];

	return (
		<>
			<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
		</>
	);
};

export default Institution;
