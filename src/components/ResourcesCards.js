import React from 'react';
import { IoFileTrayFull } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const ResourcesCards = ({ item }) => {
	const handleClick = (id) => {
		localStorage.setItem('currentResource', id);
	};
	return (
		<>
			<NavLink
				to={`/classroom/adviser/resources/${item.id}?resource=${item.id}`}
				onClick={() => handleClick(item.id)}
			>
				<div className='bg-white flex flex-col justify-center items-center shadow-lg w-40 h-40 rounded-lg mb-5 border-2 border-purple-100'>
					<IoFileTrayFull className='text-6xl text-gray-400' />

					<p className='text-sm text-gray-600'> {item.name} </p>
				</div>
			</NavLink>
		</>
	);
};

export default ResourcesCards;
