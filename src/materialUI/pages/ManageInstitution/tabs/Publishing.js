import React from "react";

//Reusable
import PublishingCardComponent from "../../../components/reuseableComponents/PublishingCardComponent";

const items = [
	{
		id: 1,
		title: "Live from space",
		abstract:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia convallis est. Donec ac diam vitae dui aliquam ultricies. Quisque placerat, velit ut sollicitudin hendrerit, quam urna elementum arcu, sit amet fringilla dui dui a dolor.",
	},
	{
		id: 2,
		title: "Live from space",
		abstract: "Here we go again.",
	},
];
const Publishing = ({ item }) => {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className="w-full">
				<div
					className="w-full p-1 space-y-3 overflow-y-auto"
					style={{ maxHeight: "600px", minHeight: "600px" }}
				>
					{items.map((item) => (
						<PublishingCardComponent item={item} />
					))}
				</div>
			</div>
		</>
	);
};

export default Publishing;
