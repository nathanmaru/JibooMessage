import { NavLink } from 'react-router-dom';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { ImBooks } from 'react-icons/im';
import { FaPencilAlt } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdSchool } from 'react-icons/md';
import { CgNotes, CgLogOut } from 'react-icons/cg';
import { SiGooglemessages } from 'react-icons/si';
import { IoLogoVercel } from 'react-icons/io5';
import { useState } from 'react';

const Navbar = () => {
	const [showSidebar, setShowSidebar] = useState('-left-64');
	return (
		<div
			className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-gray-100 w-44 z-10 py-4 px-2 transition-all duration-300`}
		>
			<div className='flex-col items-stretch min-h-full flex-nowrap px-0 relative'>
				<NavLink
					to='/'
					exact
					className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
				>
					<IoLogoVercel className='w-5 h-5 text-blue-400' />
					<h6 class='text-gray-400 text-xl font-bold'>
						meegu<span className='text-red-400'>.</span>
					</h6>
				</NavLink>
				<div className='flex flex-col'>
					<hr className='my-4 min-w-full' />
					<div class='text-gray-700 text-sm'>Main Navigation</div>
					<ul className='flex-col min-w-full flex list-none'>
						<li className='rounded-lg mb-1'>
							<NavLink
								to='/home'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-xl'
								activeClassName='bg-blue-500 text-white shadow-md'
							>
								<AiFillHome className='w-5 h-5 text-gray-400 focus:text-gray-200' />
								Home
							</NavLink>
						</li>
						<li className='rounded-lg mb-1'>
							<NavLink
								to='/library'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<ImBooks className='w-5 h-5 text-gray-400' />
								Library
							</NavLink>
						</li>
						<li className='rounded-lg mb-1 '>
							<NavLink
								to='/works'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<FaPencilAlt className='w-5 h-5 text-gray-400' />
								Workspace
							</NavLink>
						</li>
						<li className='rounded-lg mb-1 '>
							<NavLink
								to='/notes'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<CgNotes className='w-5 h-5 text-gray-400' />
								Notes
							</NavLink>
						</li>
						<li className='rounded-lg mb-1 '>
							<NavLink
								to='/messages'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<SiGooglemessages className='w-5 h-5 text-gray-400' />
								Messages
							</NavLink>
						</li>
						<hr className='my-3 min-w-full' />
						<div class='text-gray-700 text-sm'>More Navigations</div>
						<li className='rounded-lg mb-1 text-gray-700'>
							<NavLink
								to='/classroom'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<BsFillPeopleFill className='w-5 h-5 text-gray-400' />
								Classrooms
							</NavLink>
						</li>
						<li className='rounded-lg mb-1 text-gray-700'>
							<NavLink
								to='/institutions'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<MdSchool className='w-5 h-5 text-gray-400' />
								Institutions
							</NavLink>
						</li>
						<li className='rounded-lg mb-1 text-gray-700'>
							<NavLink
								to='/settings'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<AiFillSetting className='w-5 h-5 text-gray-400' />
								Settings
							</NavLink>
						</li>
						<li className='rounded-lg mb-1 text-gray-700'>
							<NavLink
								to='/logout'
								className='flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg'
								activeClassName='bg-blue-400 text-white shadow-md'
							>
								<CgLogOut className='w-5 h-5 text-gray-400' />
								Logout
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
