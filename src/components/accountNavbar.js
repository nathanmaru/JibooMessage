import React from 'react';
import NotificationDropdown from './dropdowns/NotificationDropdown';
import UserDropdown from './dropdowns/UserDropdown';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function AccountNavbar(props) {
	const location = useLocation();
	const { pathname } = location;
	const paths = pathname.split('/');
	const first = paths.shift();
	const last = paths.pop();
	console.log(paths, pathname);
	return (
		<>
			<header class='sticky top-0 w-full shadow-lg bg-gray-800 dark:bg-gray-700 items-center h-16 z-40'>
				<div class='relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center'>
					<div class='relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0'>
						<div class='container relative left-0 z-50 flex w-3/4 h-full'>
							<div class='relative flex items-center w-full lg:w-64 h-full group'>
								<div class='absolute h-auto px-2 py-1 mr-2 text-2xl font-medium text-gray-400 md:block'>
									meegu
								</div>
							</div>
						</div>
						<div class='relative p-1 flex items-center justify-end md:w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto'>
							<ul class='max-w-full h-full flex justify-end'>
								<li class='flex items-center justify-center mr-2'>
									<div class='relative flex items-center w-full lg:w-64 h-full group'>
										<div class='absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden'>
											<svg
												fill='none'
												class='relative w-5 h-5'
												stroke-linecap='round'
												stroke-linejoin='round'
												stroke-width='2'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
											</svg>
										</div>
										<svg
											class='absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'
										>
											<path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
										</svg>
										<input
											type='text'
											class='flex w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input'
											placeholder='Search'
										/>
									</div>
								</li>
								<li class='w-12 flex items-center justify-center mr-2'>
									<NotificationDropdown class='hover:bg-gray-200' />
								</li>
								<li class='w-12 flex items-center justify-center mr-3'>
									<UserDropdown class='hover:bg-gray-200' />
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
			<div class='flex flex-row w-full space-x-4 p-4  items-center'>
				{paths.map((path) => (
					<>
						<div className='text-sm font-thin'>
							<NavLink className='text-purple-400' to={`/${path}`}>
								{path.toUpperCase()}
							</NavLink>{' '}
						</div>
						<div>/</div>
					</>
				))}
				<div className='text-sm font-thin text-gray-800'>{last.toUpperCase()}</div>
				<div>/</div>
			</div>
		</>
	);
}

export default AccountNavbar;
