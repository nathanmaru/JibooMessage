import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const items = [
	{
		id: 1,
		title: "Relative Physics",
		publisher: "Labad sa Ulo Org",
		author: "Thania D.",
	},
	{
		id: 2,
		title: "Relative Physics",
		publisher: "Labad sa Ulo Org",
		author: "Thania D.",
	},
];

const FeaturedArticles = ({ item }) => {
	return (
		<>
			<div className="w-full p-1 mb-4">
				{/* <p className="text-gray-400 text-sm mb-3 lg:text-base">
					Most Recent Publications
				</p>

				<Divider sx={{ mt: 2, mb: 3, color: "#e3e3e3" }} /> */}
				<div
					className="w-full space-y-5 overflow-y-auto"
					style={{ maxHeight: "600px", minHeight: "600px" }}
				>
					{/* Mapped Cards Here  */}
					{items.map((item) => (
						<Card
							raised
							sx={{ display: "flex", width: "1000px", maxHeight: "500px" }}
						>
							<CardMedia
								component="img"
								sx={{ width: 200 }}
								image="https://images.pexels.com/photos/4584832/pexels-photo-4584832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
								alt="Live from space album cover"
							/>
							<CardContent
								className="flex flex-col justify-center items-center "
								sx={{ width: "800px" }}
							>
								<div className="flex w-full justify-between items-center">
									<p className="bg-purple-200 text-purple-600 text-xs flex justify-center tracking-wider w-24 p-1 rounded-full">
										Case Study
									</p>
									{/* {button} */}
								</div>
								<Link
									// to={`/about-article/${retrieveID}`}
									className="flex justify-start flex-col w-full space-y-3"
								>
									<div className="">
										<p className="text-gray-800 text-lg lg:text-3xl tracking-wider px-1 font-semibold  ">
											{item.title}
										</p>
									</div>
									<div>
										<div className="max-h-36 overflow-y-auto">
											<p className="text-gray-800 text-xs lg:text-sm px-1 w-full ">
												{item.publisher}
											</p>
										</div>
										<div className="max-h-36 overflow-y-auto">
											<p className="text-gray-800 text-xs lg:text-sm px-1 w-full ">
												{item.author}
											</p>
										</div>
									</div>
								</Link>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default FeaturedArticles;
