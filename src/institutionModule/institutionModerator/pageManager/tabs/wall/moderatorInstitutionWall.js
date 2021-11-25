import React from "react";

import {
	Card,
	CardActions,
	CardContent,
	Divider,
	Button,
	IconButton,
} from "@mui/material";

import { CgFileDocument } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";

const items = [
	{
		id: 1,
		title: "Capstone 2",
		date: "MM-DD-YYYY",
		author: "Thania Sinogaya",
		department: "Education",
		abstract:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet.",
	},
	{
		id: 2,
		title: "Capstone 2",
		date: "MM-DD-YYYY",
		author: "Thania Sinogaya",
		department: "Education",
		abstract:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet.",
	},
];

const departments = [
	{
		id: 1,
		name: "Education",
	},
	{
		id: 2,
		name: "Information Technology and Communications",
	},
	{
		id: 3,
		name: "Information Technology",
	},
];

const Wall = ({ item, department }) => {
	return (
		<>
			{/* <div className="bg-red-400">this is wall</div> */}

			<div class="grid grid-cols-3 gap-4">
				<div
					class="col-span-2 p-2 overflow-y-auto"
					style={{ maxHeight: "650px", minHeight: "650px" }}
				>
					{items.map((item) => (
						<Card
							item={item}
							sx={{
								maxHeight: 140,
								minHeight: 140,
								border: 1,
								borderColor: "#d4d4d4",
								mb: 1,
								p: 2,
							}}
						>
							<div className="flex justify-between items-center">
								<p className="text-3xl tracking-wider font-semibold">
									{item.title}
								</p>
								<p className="text-xs text-gray-400">{item.date}</p>
							</div>
							<p
								className="text-sm tracking-wider truncate"
								style={{
									maxHeight: "40px",
									minHeight: "40px",
									maxWidth: "1210px",
									minWidth: "1210px",
									padding: 5,
								}}
							>
								{item.abstract}
							</p>
							<div className="mt-2 px-2 flex space-x-5">
								<div className="flex items-center space-x-1">
									<CgFileDocument className="text-gray-500" />
									<p className="text-sm text-gray-500">Created by</p>
									<p className="text-xs text-gray-500">●</p>
									<p className="text-sm text-purple-500">{item.author} </p>
								</div>
								<div className="flex items-center space-x-1">
									<BsBuilding className="text-gray-500" />
									<p className="text-sm text-gray-500">Department</p>
									<p className="text-xs text-gray-500">●</p>
									<p className="text-sm text-purple-500">{item.department} </p>
								</div>
							</div>
						</Card>
					))}
				</div>

				<div
					class="px-3 py-2 overflow-y-auto border-l border-gray-200"
					style={{ maxHeight: "650px", minHeight: "650px" }}
				>
					{departments.map((department) => (
						<Card
							department={department}
							sx={{
								maxHeight: 70,
								minHeight: 70,
								border: 1,
								borderColor: "#d4d4d4",
								mb: 1,
								p: 2,
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
							}}
						>
							<div className="flex items-center space-x-2 w-full">
								<BsBuilding className="text-gray-400 text-2xl" />

								<div className="flex items-center space-x-1">
									<p className="text-gray-500 text-center">
										Department of {department.name}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default Wall;
