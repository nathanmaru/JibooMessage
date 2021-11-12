import React from "react";
import { createPopper } from "@popperjs/core";
import { MdKeyboardArrowDown } from "react-icons/md";

const SubmissionDropdown = () => {
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
	const btnDropdownRef = React.createRef();
	const popoverDropdownRef = React.createRef();
	const openDropdownPopover = () => {
		console.log("hey");
		createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
			placement: "bottom-start",
		});
		setDropdownPopoverShow(true);
	};

	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false);
	};

	return (
		<>
			<a
				className="w-32 h-8 flex items-center justify-center rounded-lg bg-white p-1.5 m-0.5  border border-gray-200 shadow-lg hover:border-gray-400"
				href="#pablo"
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault();
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
				}}
			>
				<div className="flex flex-row w-72 justify-between">
					<div className="flex flex-row items-center justify-start p-2">
						<p class="text-gray-400 text-md">Resource</p>
					</div>
					<div className="flex flex-row items-center justify-between">
						<p class="text-gray-400 text-md mr-2">
							<MdKeyboardArrowDown />
						</p>
					</div>
				</div>
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? "block " : "hidden ") +
					"bg-white text-base w-36 z-50 py-2 list-none text-left rounded shadow-lg mt-1 min-w-48 border border-gray-200"
				}
			>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1 ">
					<div class="justify-between">
						<p class="text-sm py-2 px-4 font-normal"> Resource Name </p>
					</div>
				</div>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1">
					<div class="justify-between">
						<p class="text-sm py-2 px-4 font-normal"> Resource Name </p>
					</div>
				</div>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1">
					<div class="justify-between">
						<p class="text-sm py-2 px-4 font-normal"> Resource Name </p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SubmissionDropdown;
