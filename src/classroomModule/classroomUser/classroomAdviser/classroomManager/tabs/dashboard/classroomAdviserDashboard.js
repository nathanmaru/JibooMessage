import { Doughnut } from "react-chartjs-2";

//mui
import { Card, CardActions, CardContent, Divider } from "@mui/material";

//Icons
import { FaRegCommentAlt } from "react-icons/fa";

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
const ClassroomDashboard = () => {
	return (
		<>
			{/* <div className="bg-gray-200 flex">
				<div className="bg-red-300 w-1/5">ddg</div>
				<div className="bg-blue-300 w-4/5 h-40">ddg</div>
			</div> */}

			<div class="grid grid-cols-4 gap-4">
				<div class="" style={{ maxHeight: "350px", minHeight: "350px" }}>
					<Card variant="outlined" sx={{ maxWidth: "100%" }}>
						<CardContent>
							<p className="text-lg text-center text-gray-400 mb-1">
								Storage Data
							</p>
							<Doughnut data={data} />
						</CardContent>
					</Card>
				</div>
				<div
					class="col-span-3 px-1 overflow-y-auto"
					style={{ maxHeight: "350px", minHeight: "350px" }}
				>
					{/* Activity Log starts here */}
					<Card
						sx={{
							maxHeight: 150,
							minHeight: 150,
							border: 1,
							borderColor: "#d4d4d4",
							mb: 2,
						}}
					>
						{/* Top Part */}
						<div className="flex items-center px-2" style={{ height: 50 }}>
							<div className="flex flex-row bg-white w-full flex flex-row justify-between items-center">
								<div className="flex items-center">
									<FaRegCommentAlt className="text-xl text-gray-400 mr-2" />

									<p className="text-sm text-purple-400 mr-1">
										Name here dili username
									</p>
									<p className="text-sm text-gray-400 mr-1">commented on</p>
									<p className="text-sm text-gray-400">/* Title Here */</p>
								</div>

								<div className="flex items-center">
									<p className="text-xs text-gray-400 mr-2">●</p>
									<p className="text-sm text-gray-400 mr-1">Date</p>
								</div>
							</div>
						</div>

						<Divider sx={{ m: 1 }} />
						{/* Bottom Part */}
						<div className="flex flex-row" style={{ height: 100 }}>
							{/* Vertical Line */}
							<div className="w-10 flex flex-col justify-center py-1">
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
							</div>
							<div className="bg-gray-200 w-full p-1">sdg</div>
						</div>
					</Card>

					<Card
						sx={{
							maxHeight: 150,
							minHeight: 150,
							border: 1,
							borderColor: "#d4d4d4",
							mb: 2,
						}}
					>
						{/* Top Part */}
						<div className="flex items-center px-2" style={{ height: 50 }}>
							<div className="flex flex-row bg-white w-full flex flex-row justify-between items-center">
								<div className="flex items-center">
									<FaRegCommentAlt className="text-xl text-gray-400 mr-2" />

									<p className="text-sm text-purple-400 mr-1">
										Name here dili username
									</p>
									<p className="text-sm text-gray-400 mr-1">commented on</p>
									<p className="text-sm text-gray-400">/* Title Here */</p>
								</div>

								<div className="flex items-center">
									<p className="text-xs text-gray-400 mr-2">●</p>
									<p className="text-sm text-gray-400 mr-1">Date</p>
								</div>
							</div>
						</div>

						<Divider sx={{ m: 1 }} />
						{/* Bottom Part */}
						<div className="flex flex-row" style={{ height: 100 }}>
							{/* Vertical Line */}
							<div className="w-10 flex flex-col justify-center py-1">
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
							</div>
							<div className="bg-gray-200 w-full p-1">sdg</div>
						</div>
					</Card>

					<Card
						sx={{
							maxHeight: 150,
							minHeight: 150,
							border: 1,
							borderColor: "#d4d4d4",
							mb: 2,
						}}
					>
						{/* Top Part */}
						<div className="flex items-center px-2" style={{ height: 50 }}>
							<div className="flex flex-row bg-white w-full flex flex-row justify-between items-center">
								<div className="flex items-center">
									<FaRegCommentAlt className="text-xl text-gray-400 mr-2" />

									<p className="text-sm text-purple-400 mr-1">
										Name here dili username
									</p>
									<p className="text-sm text-gray-400 mr-1">commented on</p>
									<p className="text-sm text-gray-400">/* Title Here */</p>
								</div>

								<div className="flex items-center">
									<p className="text-xs text-gray-400 mr-2">●</p>
									<p className="text-sm text-gray-400 mr-1">Date</p>
								</div>
							</div>
						</div>

						<Divider sx={{ m: 1 }} />
						{/* Bottom Part */}
						<div className="flex flex-row" style={{ height: 100 }}>
							{/* Vertical Line */}
							<div className="w-10 flex flex-col justify-center py-1">
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
								<p className="text-gray-400 text-sm flex justify-center -mt-1">
									┆
								</p>
							</div>
							<div className="bg-gray-200 w-full p-1">sdg</div>
						</div>
					</Card>
				</div>
			</div>
			{/* <Card variant="outlined" sx={{ maxWidth: "20%" }}>
				<CardContent>
					<p className="text-lg text-center text-gray-400 mb-1">Storage Data</p>
					<Doughnut data={data} />
				</CardContent>
			</Card> */}
		</>
	);
};

export default ClassroomDashboard;
