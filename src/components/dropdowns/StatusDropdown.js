import React from "react";
import { createPopper } from "@popperjs/core";
import { CgEditFlipH } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";

const StatusDropdown = () => {
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
				className="w-full h-10 flex rounded-lg bg-white border border-gray-300"
				// className="rounded-r-lg flex-1 mt-3 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
				href="#pablo"
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault();
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
				}}
			>
				<div className="flex flex-row w-60 justify-between ">
					<div className="flex items-center w-10 text-center text-gray-500  justify-center rounded-l-md border-r border-gray-300">
						<CgEditFlipH />
					</div>
					<p class="text-gray-400 text-md mr-auto ml-5 flex items-center justify-between">
						Role
					</p>
				</div>
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? "block " : "hidden ") +
					"bg-white text-base mt-5 w-96 py-2 list-none text-left rounded shadow-lg min-w-48 border-r border-l border-b border-purple-400"
				}
			>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1 ">
					<div class="justify-between">
						<p class="text-sm py-2 px-4 font-normal"> Private </p>
					</div>
				</div>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1 ">
					<div class="justify-between">
						<p class="text-sm py-2 px-4 font-normal"> Public </p>
					</div>
				</div>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1 ">
					<div class="justify-between">
						<p class="text-sm py-2 px-4 font-normal"> Draft </p>
					</div>
				</div>
			</div>
		</>
	);
};

export default StatusDropdown;
