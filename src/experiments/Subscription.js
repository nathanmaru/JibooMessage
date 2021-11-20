import React from "react";

import CardComponent from "../materialUI/components/reuseableComponents/cardComponent";
import CardHolder from "../materialUI/components/reuseableComponents/cardHolder";

import { Avatar, Chip, Button } from "@mui/material";

const classroomSubs = [
	{
		id: 1,
		type: "basic",
		price: "700",
		offer1: "Up to 1.5 GB per classroom",
	},
	{
		id: 2,
		type: "premium",
		price: "1,000",
		offer1: "Up to 3 GB per classroom",
	},
];

const institutionSubs = [
	{
		id: 1,
		type: "basic",
		price: "1,000",
		offer1: "Up to 5 GB per institution",
	},
	{
		id: 2,
		type: "premium",
		price: "2,500",
		offer1: "Up to 8 GB per institution",
	},
];

const Subscription = ({ classroomSub }) => {
	return (
		<>
			<div className="bg-red-300 p-4 w-full h-auto">
				<p className="text-2xl font-extrabold mb-5">
					{" "}
					Classroom Subscriptions{" "}
				</p>
				<CardHolder>
					{classroomSubs.map((classroomSub) => (
						<CardComponent item={classroomSub} height="370px" width="300px">
							<div className="flex justify-end">
								<Chip
									label="Best Offer"
									sx={{ bgcolor: "#FFDF00", color: "#FF6000" }}
								/>
							</div>

							<div className="text-gray-600 mt-2 flex justify-center uppercase tracking-widest font-mono font-semibold">
								{classroomSub.type}
							</div>

							<div className="flex justify-center">
								<p className="text-7xl mr-1">₱</p>
								<p className="text-5xl font-semibold mt-auto">
									{classroomSub.price}
								</p>
								<p className="text-xl text-gray-5400 mt-auto">/mo</p>
							</div>

							<div className="mt-10 flex flex-col justify-center">
								<div className="mt-1 px-3 flex flex-row justify-center">
									<p className="w-1/2">Storage</p>
									<p className="w-1/2 text-sm text-gray-400">
										{classroomSub.offer1}
									</p>
								</div>
								{/* <div className="mt-1 px-3 flex flex-row justify-center">
									<p className="w-1/2">Unlimited</p>
									<p className="w-1/2 text-sm text-gray-400">
										{classroomSub.offer2}
									</p>
								</div>
								<div className="mt-1 px-3 flex flex-row justify-center">
									<p className="w-1/2">Up to 3</p>
									<p className="w-1/2 text-sm text-gray-400">
										{classroomSub.offer3}
									</p>
								</div> */}
							</div>

							<div className="bg-green-400 mt-14">
								<Button
									variant="contained"
									sx={{
										width: 270,
										height: 50,
										bgcolor: "#FF6000",
										color: "#FFDF00",
									}}
								>
									BUY NOW
								</Button>
							</div>
						</CardComponent>
					))}
				</CardHolder>

				<p className="text-2xl font-extrabold mb-5 mt-10">
					{" "}
					Institution Subscriptions{" "}
				</p>
				<CardHolder>
					{institutionSubs.map((institutionSub) => (
						<CardComponent item={institutionSub} height="370px" width="300px">
							<div className="flex justify-end">
								<Chip
									label="Best Offer"
									sx={{ bgcolor: "#FFDF00", color: "#FF6000" }}
								/>
							</div>

							<div className="text-gray-600 mt-2 flex justify-center uppercase tracking-widest font-mono font-semibold">
								{institutionSub.type}
							</div>

							<div className="flex justify-center">
								<p className="text-7xl mr-1">₱</p>
								<p className="text-5xl font-semibold mt-auto">
									{institutionSub.price}
								</p>
								<p className="text-xl text-gray-5400 mt-auto">/mo</p>
							</div>

							<div className="mt-10 flex flex-col justify-center">
								<div className="mt-1 px-3 flex flex-row justify-center">
									<p className="w-1/2">Storage</p>
									<p className="w-1/2 text-sm text-gray-400">
										{institutionSub.offer1}
									</p>
								</div>
							</div>

							<div className="bg-green-400 mt-14">
								<Button
									variant="contained"
									sx={{
										width: 270,
										height: 50,
										bgcolor: "#FF6000",
										color: "#FFDF00",
									}}
								>
									BUY NOW
								</Button>
							</div>
						</CardComponent>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default Subscription;
