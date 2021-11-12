import React from 'react';
import { createPopper } from '@popperjs/core';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

const SortingDropdown = () => {
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
	const btnDropdownRef = React.createRef();
	const popoverDropdownRef = React.createRef();
	const openDropdownPopover = () => {
		console.log('hey');
		createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
			placement: 'bottom-start',
		});
		setDropdownPopoverShow(true);
	};

	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false);
	};

	return (
		<>
			<a
				className='w-24 h-8 flex items-center justify-center rounded-lg bg-white p-1.5 m-0.5  border border-gray-100 shadow-lg hover:border-gray-400'
				href='#pablo'
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault();
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
				}}
			>
				<div className='flex flex-row w-60 justify-between'>
					<div className='flex flex-row items-center justify-start p-2'>
						<p class='text-gray-400 text-md'>Name</p>
					</div>
					<div className='flex flex-row items-center justify-between'>
						<p class='text-gray-400 text-md'>
							<MdKeyboardArrowDown />
						</p>
					</div>
				</div>
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? 'block ' : 'hidden ') +
					'bg-white text-base w-36 z-50 py-2 list-none text-left rounded shadow-lg mt-1 min-w-48 border border-gray-200'
				}
			>
				<div class='flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1 '>
					{/* <Link to="/"> */}
					<div class='justify-between'>
						<p class='text-sm py-2 px-4 font-normal'> Name </p>
					</div>
					{/* </Link> */}
				</div>
				<div class='flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1'>
					{/* <Link to="/"> */}
					<div class='justify-between'>
						<p class='text-sm py-2 px-4 font-normal'> Date </p>
					</div>
					{/* </Link> */}
				</div>
			</div>
		</>
	);
};

export default SortingDropdown;
