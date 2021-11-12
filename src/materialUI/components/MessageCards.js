import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function MessageCards({ item }) {
	return (
		<>
			{/* <div className="bg-red-200 p-2"> */}
			{/* <Card sx={{ maxWidth: 450, marginLeft: "6px" }}>
					<CardHeader
						avatar={
							<Avatar sx={{ bgcolor: "#ad4242" }} aria-label="recipe">
								R
							</Avatar>
						}
						// action={
						// 	<IconButton aria-label="settings">
						// 		<MoreVertIcon />
						// 	</IconButton>
						// }
						title="Shrimp and Chorizo Paella"
						subheader="September 14, 2016"
					/>
				</Card> */}

			<div className="bg-white w-full flex flex-row justify-between rounded-lg hover:bg-gray-100">
				<div className="justify-start p-2">
					<Avatar sx={{ bgcolor: "#ad4242" }} aria-label="recipe">
						R
					</Avatar>
				</div>
				<div className="justify-between mr-auto w-full">
					<div className="flex flex-col justify-between w-full">
						<p className="justify-start text-lg text-gray-500">{item.sender}</p>
						<div className="flex flex-row justify-between">
							<p className="justify-start text-sm text-gray-500 ml-3">
								{item.sendBy}:
							</p>
							<p className="justify-between text-sm text-gray-500 mr-auto ml-1">
								{item.message}
							</p>
						</div>
					</div>
				</div>
				<div className="justify-between mr-auto p-1 items-center flex">
					{/* <div className="flex flex-col justify-between w-full bg-blue-300">
							<p className="justify-start text-xl text-gray-500">
								{item.sender}
							</p>
							<p className="justify-start text-xl text-gray-500">
								{item.message}
							</p>
						</div> */}
					<div className="w-3 h-3 rounded-full mr-2 bg-green-700"></div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
}
