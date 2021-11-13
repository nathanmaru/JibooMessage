import React from "react";
import SubmissionDropdown from "../components/dropdowns/SubmissionDropdown";
import ResourcesCards from "../components/ResourcesCards";
import CardComponent from "../materialUI/components/reuseableComponents/cardComponent";

const items = [
	{
		id: "1",
		name: "Practical Research 2",
	},
	{
		id: "2",
		name: "Professional Elective 1",
	},
];

const ClassroomSubmissions = () => {
	return (
		<>
			<div class="mt-5 mb-10 flex flex-col w-full p-4 space-y-4">
				<div class="flex ml-auto mr-5">
					<SubmissionDropdown />
				</div>

				<div className="flex flex-row flex-wrap w-full items-center lg:justify-start justify-center p-3 space-x-3">
					{items.map((item) => (
						<CardComponent item={item} />
					))}
				</div>
			</div>
		</>
	);
};

export default ClassroomSubmissions;
