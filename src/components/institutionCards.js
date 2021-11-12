import React from 'react';  
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const InstitutionCard = ( { bg, baseURL, id, instName, instCategory, instDesc, owner} ) => { 
	const handleClick = (id) => {
		localStorage.setItem('currentInstitution', id);
	};
	console.log(instName);

	return (  
		<NavLink to={`${baseURL}/${id}?institution=${id}`} onClick={() => handleClick(id)}>
			<div class='overflow-hidden shadow-lg rounded-lg h-90 w-96 md:w-80 max-w-full cursor-pointer m-5 mt-5 border-4 border-purple-200 hover:bg-blue-200 transition transform hover:-translate-y-1 hover:scale-110'>
				<div class='hover:to-blue-300'>
					<img alt='blog' src={bg} class='max-h-40 w-full object-cover' />
				</div>

				<div class='bg-white dark:bg-gray-800 w-full p-4'>
					<div className='flex flex-row w-60 justify-between'>
						<div className='flex flex-row items-center justify-start'>
							 <p class='text-gray-400 text-md'>{instCategory}</p> 
						</div>
						<div className='flex flex-row items-center justify-between'>
							 <p class='text-gray-400 text-md'>{instDesc}</p> 
						</div>
					</div>

					 <p class='text-gray-800 dark:text-white text-xl font-medium mb-2'>{instName}</p> 

					<div class='flex items-center mt-4'>
						<Avatar />

						<div class='flex flex-col justify-between ml-4 text-sm'>
							 <p class='text-gray-800 dark:text-white'>{owner}</p> 
						</div>
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default InstitutionCard;
