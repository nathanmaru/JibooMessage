import React from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

const data = {
	labels: ["Storage Used", "Storage Left"],
	datasets: [
		{
			label: "Storage Data",
			data: [34, 19],
			fill: false,
			// backgroundColor: ["rgb(133, 70, 185)", "rgb(158, 107, 199)"],
			backgroundColor: ["#904CB3", "#D2B6E0"],
			borderColor: ["#904CB3", "#D2B6E0"],
			borderWidth: 1,
			borderRadius: 3,
			tension: 0.4,
			hoverOffset: 4,
		},
	],
};

const options = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};

const DummyDashboard = () => {
	return (
		<>
			<div className="p-3 h-auto">
				<p className="text-2xl">Doughnut Chart</p>

				{/* <Line data={data} options={options} /> */}
				{/* <div
					className="border-2 border-gray-500 p-4"
					style={{ width: "600px", height: "600px" }}
				>
					<Doughnut data={data} />
				</div> */}
			</div>
		</>
	);
};

export default DummyDashboard;
