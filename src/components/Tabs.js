import React, { useState } from 'react';
import { BiBookReader } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export default function Tabs({ items }) {
	const [openTab, setOpenTab] = useState(1);

	const activeTab = (key) => {
		if (openTab === key) {
			return 'border-b-2 border-blue-300';
		}
		return null;
	};

	return (
		<div>
			<ul class='flex flex-row w-full h-14 items-center text-gray-700 border-b-2'>
				{items.map((item) => (
					<li key={item.key}>
						<NavLink
							to={item.link}
							// onClick={(e) => {
							// 	e.preventDefault();
							// 	setOpenTab(item.key);
							// }}
							exact
							activeClassName='border-b-2 border-blue-300'
							className={`py-4 px-5 cursor-pointer hover:bg-blue-100 hover:opacity-70 flex flex-row justify-between items-center space-x-2`}
						>
							<div>{item.name}</div>
							{/* <div>{item.icon}</div> */}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}
