import React, { useState } from "react";
import { HiOutlineFilter, HiOutlineViewGridAdd } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import AvatarGroups from "../components/AvatarGroups";
import ResourceFilesDropdown from "./dropdowns/ResourceFilesDropdown";

const WorkspaceFilesTop = () => {
	return (
		<>
			<div className="p-2 rounded-md border-b-2 border-gray-100 mb-5 shadow-md">
				<div className="flex flex-row justify-between">
					<div className="justify-start w-60">
						<div className="flex flex-row justify-between">
							<div className="justify-start">
								<ResourceFilesDropdown />
							</div>

							<div className="justify-between">
								<div className="flex flex-row justify-between">
									<button
										type="button"
										className="h-10 w-30 p-2 rounded-lg justify-start items-center"
									>
										<HiOutlineFilter className="justify-start text-xl text-gray-500 mr-2" />
									</button>
									<button
										type="button"
										className="h-10 w-30 p-2 rounded-lg justify-start items-center"
									>
										<RiDeleteBin5Line className="justify-between text-xl text-gray-500 mr-2" />
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="justify-between mr-auto w-52 items-center text-center">
						<h1 className="text-3xl text-gray-500 font-semibold">
							{" "}
							Project Title
						</h1>
					</div>
					<div className="justify-between ml-auto w-2/6 items-center text-center">
						<div className="flex flex-row justify-between items-center h-10">
							<div className="flex flex-row justify-between">
								{/* <div className="justify-start">
									<ToggleSwitch
										id="projectPart"
										checked={projectPart}
										onChange={setProjectPart}
									/>
								</div> */}
								<div className="justify-between w-72">
									<AvatarGroups className="" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WorkspaceFilesTop;
