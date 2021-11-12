import React from "react";
import { folder } from "./Data.js";

import { HiOutlineFolderOpen } from "react-icons/hi";
import { Link } from "react-router-dom";

const WorkspaceFilesSidebar = () => {
	return (
		<>
			<div class="flex flex-col justify-between">
				{/* Files  */}
				<ul>
					{folder.map((fold) => (
						<li key={fold.id}>
							<div class="justify-start hover:bg-purple-100 hover:text-purple-600 rounded-md">
								<Link
									to="/"
									class="flex flex-row justify-between p-2  rounded-md"
								>
									<HiOutlineFolderOpen class="justify-start text-2xl" />
									<p class="justify-between w-3/4">{fold.name}</p>
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default WorkspaceFilesSidebar;
