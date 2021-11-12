import React from "react";
import MemberCards from "../components/MemberCards";

const items = [
	{
		id: "1",
		name: "thania",
		role: "Member",
	},
	{
		id: "2",
		name: "thania",
		role: "Member",
	},
	{
		id: "3",
		name: "thania",
		role: "Member",
	},
	{
		id: "4",
		name: "thania",
		role: "Member",
	},
	{
		id: "5",
		name: "thania",
		role: "Member",
	},
];
const WorkspaceMembers = () => {
	return (
		<>
			<div className="mt-5 ml-5 flex flex-row flex-wrap w-full items-center lg:justify-start justify-center space-x-5 ">
				{items.map((item) => (
					<MemberCards item={item} />
				))}
				{/* <MemberCards /> */}
			</div>
		</>
	);
};

export default WorkspaceMembers;
