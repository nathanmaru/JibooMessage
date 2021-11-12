import React, { useState } from "react";
import { CgEditFlipH, CgFileDocument } from "react-icons/cg";
import { RiDeleteBin5Line } from "react-icons/ri";
import InputIconField from "../components/commons/inputIconField";
import StatusDropdown from "../components/dropdowns/StatusDropdown";

const WorkspaceDashboard = () => {
	const [inputForm, setInputForm] = useState({
		project_name: "",
		code: "",
	});

	const { project_name, code } = inputForm;

	const onChange = (e) =>
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	return (
		<>
			<div className="w-full p-2">
				<div className="w-full h-52 p-3 border-b-2 border-gray-300 flex flex-row justify-between">
					<div className="justify-start w-1/2">
						<div className="flex flex-row justify-between">
							<div className="justify-start flex items-center text-center w-1/4">
								<div className="mx-3 w-32 h-20 flex items-center justify-center">
									<CgFileDocument className="flex items-center text-center text-7xl text-gray-300" />
								</div>
							</div>
							<div className="justify-between w-3/4 p-2">
								<InputIconField
									icon={<CgEditFlipH className="h-4 w-4" />}
									title="Project Name:"
									type="text"
									name="project_name"
									placeholder="Project Name"
									value={project_name}
									onChange={(e) => onChange(e)}
								/>
								<StatusDropdown />
							</div>
						</div>
					</div>
					<div className="justify-between w-1/2">
						<div className="justify-between ml-5 w-3/4 p-2">
							<InputIconField
								icon={<CgEditFlipH className="h-4 w-4" />}
								title="Code:"
								type="text"
								name="code"
								placeholder="Code"
								value={code}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</div>
					<div className="flex flex-col justify-between">
						<button className="bg-purple-50 shadow-md border border-purple-100 w-24 h-10 mb-2 -mr-2 flex mt-auto items-center justify-center rounded-md transition transform hover:-translate-y-1 hover:scale-110">
							<p className="text-gray-400"> Upload </p>
						</button>
					</div>
					<div className="flex flex-col justify-between">
						<button className="w-20 h-16 flex mt-auto items-center justify-center rounded-lg transition transform hover:-translate-y-1 hover:scale-110">
							<RiDeleteBin5Line className="text-3xl text-red-400" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default WorkspaceDashboard;
