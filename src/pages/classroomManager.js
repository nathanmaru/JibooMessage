import React from 'react';
import { BsFillChatFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { GoFileSubmodule } from 'react-icons/go';
import Tabs from '../components/Tabs';

import ClassroomStudents from "./classroomStudents";
import { Route, Switch } from 'react-router-dom';
import ClassroomResources from "./classroomResources";
import ClassroomSubmissions from "./ClassroomSubmissions";
import ClassroomDashboard from "./ClassroomDashboard";


const ClassroomManager = () => {
	const items = [
		{
			key: 1,
			name: 'Dashboard',
			icon: <MdDashboard />,
			link: '/classroom/dashboard',
		},
		{
			key: 2,
			name: 'Students',
			icon: <GoFileSubmodule />,
			link: '/classroom/students',
		},
		{
			key: 3,
			name: 'Resources',
			icon: <BsFillChatFill />,
			link: '/classroom/resources/',
		},
		{
			key: 4,
			name: 'Submission',
			icon: <IoMdSettings />,
			link: '/classroom/submission',
		},
	];

	return (
		<>
			<div className='w-full'>
				<div></div>
				<Tabs items={items} />

        <Switch>
          <Route path="/classroom/dashboard" component={ClassroomDashboard} />
          <Route path="/classroom/students" component={ClassroomStudents} />
          <Route path="/classroom/resources" component={ClassroomResources} />
          <Route path="/classroom/submission" component={ClassroomSubmissions} />
        </Switch>

			</div>
		</>
	);
};

export default ClassroomManager;
