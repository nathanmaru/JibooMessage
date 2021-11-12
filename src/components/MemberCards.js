import React from "react";
import EllipsisDropdown from "./dropdowns/EllipsisDropdown";
// import { NavLink } from "react-router-dom";

const MemberCards = ({ item }) => {
	return (
		<>
			{/* <NavLink to={`/works/${item.id}`}> */}
			<div className="bg-white flex flex-col items-center shadow-lg w-56 h-56 rounded-lg mb-5 border-2 border-purple-50 hover:border-purple-300">
				<div className="justify-start ml-auto">
					<EllipsisDropdown />
				</div>
				<img
					class="w-28 h-28 rounded-full object-cover -mt-2"
					alt=""
					src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
				/>
				{/* <IoFileTrayFull className="text-6xl text-gray-400" /> */}

				<h2 className="text-xl font-semibold mt-1">{item.name}</h2>
				<p className="text-sm text-gray-400 mt-1">{item.role}</p>
			</div>
			{/* </NavLink> */}
		</>
	);
};

export default MemberCards;
