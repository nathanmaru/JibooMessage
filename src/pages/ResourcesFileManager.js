import React from 'react';
import { BsFillChatFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { GoFileSubmodule } from 'react-icons/go';
import Tabs from '../components/Tabs';
import { Route } from 'react-router-dom';
import ResourcesFiles from './resourcesFiles';

const ResourcesFileManager = () => {
	const items = [
		{
			key: 1,
			name: 'Dashboard',
			icon: <MdDashboard />,
			link: '/resources/dashboard',
		},
		{
			key: 2,
			name: 'Files',
			icon: <GoFileSubmodule />,
			link: '/resources/files',
		},
		{
			key: 4,
			name: 'Subscription',
			icon: <IoMdSettings />,
			link: '/resources/subscription',
		},
	];

	return (
		<>
			<div className='w-full'>
				<div></div>
				<Tabs items={items} />

				<Route path='/resources/files' component={ResourcesFiles} />
				{/* <Route path='/classroom/dashboard' component={ProjectDashboard} /> */}
				{/* <Route path='/workspace/files' component={Maot} />
			<Route path='/workspace/chat' component={Maot} /> */}
			</div>
		</>
	);
};

export default ResourcesFileManager;
