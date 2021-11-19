import React from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import { Avatar, Chip } from "@mui/material";

const data = {
	labels: ["Storage Used", "Storage Left"],
	datasets: [
		{
			label: "Storage Data",
			data: [34, 19],
			fill: false,
			backgroundColor: ["#904CB3", "#D2B6E0"],
			borderColor: ["#904CB3", "#D2B6E0"],
			borderWidth: 1,
			hoverOffset: 2,
			cutout: "80%",
			options: {
				animation: {
					animateScale: true,
				},
			},
		},
	],
};

const DummyDashboard = () => {
	return (
		<>
			<div className="p-3 h-auto">
				<div className="p-2 flex flex-row">
					<div className="w-3/5">
						<p className="bg-purple-200 text-purple-500 text-xs w-28 px-2 py-1 flex items-center justify-center rounded-md">
							Classroom
						</p>

						<p className="mt-3 text-2xl">Classroom Name</p>

						<div className="mt-1 flex flex-row items-center">
							<Avatar
								alt="Remy Sharp"
								src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
								sx={{ width: 20, height: 20 }}
							/>

							<p className="text-sm text-gray-600 ml-2">Raymond Mangumpit</p>
						</div>

						<p className="mt-4 mb-1 text-base">description</p>
					</div>

					<div className="w-2/5 py-6">
						<div className="flex flex-row items-center px-4 float-right mb-2 mt-2">
							<p className="text-sm text-gray-400 mr-3">Update</p>
							<p className="text-sm text-gray-400 mr-3">
								━━━━━━━━━━━━━━━━━━━━━
							</p>
							<Chip
								label="3 new"
								variant="outlined"
								sx={{ mr: 1, height: "20px", color: "#97a0a8" }}
							/>
							<p className="text-sm text-gray-400">3</p>
						</div>

						<div className="flex flex-row items-center px-4 float-right mb-2">
							<p className="text-sm text-gray-400 mr-3">Recommendations</p>
							<p className="text-sm text-gray-400 mr-3">
								━━━━━━━━━━━━━━━━━━━━━
							</p>
							<Chip
								label="3 new"
								variant="outlined"
								sx={{ mr: 1, height: "20px", color: "#97a0a8" }}
							/>
							<p className="text-sm text-gray-400">3</p>
						</div>

						<div className="flex flex-row items-center px-4 float-right mb-2">
							<p className="text-sm text-gray-400 mr-3">Reads</p>
							<p className="text-sm text-gray-400 mr-3">
								━━━━━━━━━━━━━━━━━━━━━
							</p>
							<Chip
								label="3 new"
								variant="outlined"
								sx={{ mr: 1, height: "20px", color: "#97a0a8" }}
							/>
							<p className="text-sm text-gray-400">3</p>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-row space-x-4 p-1">
					<div
						className="p-4 shadow-lg border border-gray-100"
						style={{ width: "400px", height: "450px" }}
					>
						<p className="text-lg text-center text-gray-400 mb-1">
							Storage Data
						</p>

						<Doughnut data={data} />
					</div>
				</div>
			</div>
		</>
	);
};

export default DummyDashboard;
