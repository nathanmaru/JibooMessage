import React from "react";
import { createPopper } from "@popperjs/core";
import { VscBellDot } from "react-icons/vsc";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
	// dropdown props
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
			{/* <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 p-1.5 m-0.5" href="#pablo" ref={btnDropdownRef} */}
			<a
				className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 p-1.5 m-0.5 hover:bg-gray-400"
				href="#pablo"
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault();
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
				}}
			>
				<VscBellDot class="text-xl" />
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? "block " : "hidden ") +
					"bg-white text-base w-52 z-50 py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
				}
			>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1">
					<Link to="/">
						<div class="justify-between">
							<p class="text-sm py-2 px-4 font-normal"> See Notifications </p>
						</div>
					</Link>
				</div>
				<div class="flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1">
					<Link to="/">
						<div class="justify-between">
							<p class="text-sm py-2 px-4 font-normal"> Settings </p>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default NotificationDropdown;
