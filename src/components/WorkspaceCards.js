import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const WorkspaceCards = ({ item }) => {
	return (
		<>
			<NavLink to={`/works/${item.id}?workspace=${item.id}`}>
				<div class='overflow-hidden shadow-lg rounded-lg h-90 w-96 md:w-80 max-w-full cursor-pointer m-5 mt-5 border-4 border-purple-200 hover:bg-blue-200 transition transform hover:-translate-y-1 hover:scale-110'>
					<div class='hover:to-blue-300'>
						<img
							alt='blog'
							src='https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
							class='max-h-40 w-full object-cover'
						/>
					</div>

					<div class='bg-white dark:bg-gray-800 w-full p-4'>
						<div className='flex flex-row w-60 justify-between'></div>

						<p class='text-gray-800 dark:text-white text-xl font-medium mb-2'>{item.name}</p>
						<p class='text-gray-800 dark:text-white text-justify text-sm mb-5'>
							{item.description}
						</p>

						<div className='flex flex-row justify-between mt-2 border-t-2 items-center border-purple-50'></div>
					</div>
				</div>
			</NavLink>
		</>
	);
};

export default WorkspaceCards;
