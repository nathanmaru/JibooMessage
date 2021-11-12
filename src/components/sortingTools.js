import React from "react";
import SortingDropdown from "./dropdowns/SortingDropdown";

import { HiSortDescending } from "react-icons/hi";

const SortingTools = () => {
	return (
		<>
			<div class="flex flex-row w-full justify-end  items-center space-x-2">
				<div className="text-gray-700">Sort by:</div>

				<div>
					<SortingDropdown />
				</div>

				<div>
					<button type="button" class="h-8 w-12 p-1.5 m-0.5 items-center">
						<HiSortDescending class="text-gray-500 text-2xl hover:text-purple-500" />
					</button>
				</div>
			</div>
		</>
	);
};

export default SortingTools;
