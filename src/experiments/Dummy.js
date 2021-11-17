import React from "react";
import CardComponent from "../materialUI/components/reuseableComponents/cardComponent";
import CardHolder from "../materialUI/components/reuseableComponents/cardHolder";
import DialogComponent from "../materialUI/components/reuseableComponents/dialogComponent";

import {
	Button,
	Typography,
	Box,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Divider,
} from "@mui/material";

import { GrSearch } from "react-icons/gr";

const items = [
	{
		id: 1,
		name: "Research Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet, fringilla mauris. Etiam hendrerit velit vitae sollicitudin pulvinar. Vivamus dictum magna sit amet ligula sollicitudin maximus. Aenean congue, neque sed semper mollis, tortor nulla semper dui, ac vulputate velit odio a diam.",
	},
];
const Dummy = () => {
	const [part, setPart] = React.useState("");

	const handleChange = (event) => {
		setPart(event.target.value);
	};

	return (
		<>
			<div className="bg-gray-300 h-screen p-14">
				<div className="bg-white h-full p-10">
					<CardHolder>
						{items.map((item) => (
							<CardComponent item={item} height="180px" width="1300px">
								<div className="flex flex-col space-y-2 w-full">
									<div class="flex justify-end">
										<DialogComponent
											title="Research Title"
											context="Author/s"
											maxWidth="md"
											button={<Button variant="contained">Publish</Button>}
										>
											<div className="mt-2">
												<div className="w-full flex flex-row justify-between ">
													<Box sx={{ minWidth: 160 }}>
														<FormControl fullWidth>
															<InputLabel id="demo-simple-select-label"></InputLabel>
															<Select
																labelId="demo-simple-select-label"
																id="demo-simple-select"
																value={part}
																onChange={handleChange}
																sx={{ height: 40 }}
															>
																<MenuItem value={10}>Part 1</MenuItem>
																<MenuItem value={20}>Part 2</MenuItem>
																<MenuItem value={30}>Part 3</MenuItem>
															</Select>
														</FormControl>
													</Box>

													<Button
														variant="text"
														sx={{ ml: "auto", color: "#ae99c9" }}
													>
														Plagiarism Check
													</Button>
													<Button
														variant="text"
														sx={{ ml: 3, color: "#ae99c9" }}
													>
														Call for revision
													</Button>
													<Button
														variant="text"
														sx={{ ml: 3, color: "#ae99c9" }}
													>
														Publish
													</Button>
												</div>
											</div>

											<div
												className="border border-gray-500 p-2 mt-3"
												style={{ maxHeight: "530px", minHeight: "530px" }}
											>
												sdg
											</div>
										</DialogComponent>
									</div>

									<div>
										<Typography gutterBottom variant="h6" component="div">
											{item.name}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
											}}
										>
											{item.description}
										</Typography>
									</div>
								</div>
								<div className="mt-5 flex flex-row justify-between w-full">
									<p className="text-sm text-right  text-gray-400 w-32 ml-auto">
										Recommended by :
									</p>
									<p className="text-sm text-right text-gray-400 ml-1 w-32">
										@adviserusername
									</p>
								</div>
							</CardComponent>
						))}
					</CardHolder>
				</div>
			</div>
		</>
	);
};

export default Dummy;
