import { useEffect, useState } from "react";

//Material UI
import {
	IconButton,
	Button,
	Rating,
	Box,
	Avatar,
	TextField,
	InputAdornment,
	Typography,
} from "@mui/material";

//Icons
import { CgFileDocument, CgFileRemove } from "react-icons/cg";
import { TiDocumentAdd } from "react-icons/ti";
import StarIcon from "@mui/icons-material/Star";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { retrieveArticle } from "../../store/articleSlice";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DialogComponent from "../components/reuseableComponents/dialogComponent";

// const labels = {
// 	0.5: "Useless",
// 	1: "Useless +",
// 	1.5: "Poor",
// 	2: "Poor +",
// 	2.5: "Ok",
// 	3: "Ok +",
// 	3.5: "Good",
// 	4: "Good +",
// 	4.5: "Excellent",
// 	5: "Excellent +",
// };

const AboutArticles = ({ match, location }) => {
	const { id } = match.params;
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(retrieveArticle(id));
	}, []);

	const fetchArticle = useSelector((state) => state.article.currentArticle);
	const [article, setArticle] = useState({
		id: "",
		title: "",
		abstract: "",
		publishedDate: "",
		author: "",
		file: "",
	});

	useEffect(() => {
		if (fetchArticle) {
			setArticle(fetchArticle);
		}
	}, [fetchArticle]);

	const viewPdf = () => {
		history.push("/fileViewer?filePath=" + article.file);
	};
	const addArticle = () => {
		console.log(article.id);
	};

	//ratings
	const [value, setValue] = useState(2);
	// const [hover, setHover] = useState(-1);

	//comments
	const [comment, setComment] = useState("");

	// const handleChange = (event) => {
	// 	setComment(event.target.value);
	// };

	return (
		<>
			<div className="w-full">
				<div className="border-l-2 border-b-2 border-gray-200 p-4">
					<p className="text-3xl text-gray-800 font-bold tracking-wider">
						{article.title}
					</p>
				</div>
				<div
					className="flex flex-row justify-between border-l-2 border-gray-200"
					style={{
						maxHeight: "670px",
						minHeight: "670px",
					}}
				>
					{/* Left Side */}
					<div
						className="justify-start w-full border-r-2 border-gray-200 p-3"
						style={{
							maxHeight: "670px",
							minHeight: "670px",
						}}
					>
						<div className="mb-3 flex flex-row justify-between">
							<p className="text-xl text-gray-600 font-medium">
								{article.author}
							</p>
						</div>

						<div className="flex flex-col justify-between mt-5 mb-5">
							<p className="justify-start text-xl text-gray-600">Abstract</p>
							<div
								className="justify-between p-2 overflow-y-auto text-sm text-justify"
								style={{
									maxHeight: "230px",
									minHeight: "230px",
								}}
							>
								{article.abstract}
							</div>
						</div>

						<div className="flex flex-col justify-between mt-10">
							<p className="justify-start text-gray-400 mb-1">Comments</p>
							<div
								className="justify-between p-2 overflow-y-auto text-sm text-justify border border-gray-50 shadow"
								style={{
									maxHeight: "310px",
									minHeight: "310px",
								}}
							>
								<div className="w-full h-10 flex items-center px-1">
									<div className="bg-white text-gray-500">
										Total # of Comments
									</div>
								</div>

								{/* Write Comment Here */}
								<div className="w-full h-12 flex items-center px-1 mb-1">
									<Avatar
										alt="Remy Sharp"
										sx={{ mr: 1 }}
										src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									/>
									<TextField
										id="standard-basic"
										// label="Comment here ..."
										name="name"
										// value={comment}
										// onChange={(e) => onChange(e)}
										// onChange={handleChange()}
										variant="standard"
										sx={{ fontSize: "8px", mt: -2, width: "490px", mr: 1 }}
									/>

									<Button
										variant="contained"
										aria-label="send"
										edge="end"
										sx={{ maxHeight: "30px", minHeight: "30px" }}
										// onClick={submit}
									>
										<p className="text-sm">Comment</p>
									</Button>
								</div>

								{/* Comments Made by Other People */}
								<div
									className="flex flex-col overflow-y-auto"
									style={{
										maxHeight: "200px",
										minHeight: "200px",
									}}
								>
									<div className="w-full h-auto flex justify-between items-center px-1 mb-1">
										<Avatar
											alt="Remy Sharp"
											sx={{ mr: 1 }}
											src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
										/>
										<p className="text-sm text-gray-500 mr-auto w-4/5 h-full py-1">
											Comment
										</p>
										<p className="text-xs text-gray-400 w-1/6">MM/DD/YYYY</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side */}
					<div
						className="justify-between w-full"
						style={{
							maxHeight: "670px",
							minHeight: "670px",
						}}
					>
						<div className="p-3 w-full h-1/6 border-b-2 border-gray-200">
							<div className="w-full flex space-x-4">
								<Button
									onClick={viewPdf}
									variant="outlined"
									endIcon={<PictureAsPdfIcon />}
								>
									View PDF
								</Button>
								<Button
									onClick={addArticle}
									variant="outlined"
									endIcon={<TiDocumentAdd />}
								>
									Add to Library
								</Button>
							</div>
						</div>

						<div className="w-full h-1/6 p-4 border-b-2 border-gray-200">
							<p className="text-xl text-gray-400 mb-1">Published</p>
							<p className="text-sm text-gray-400"> {article.publishedDate}</p>
						</div>

						<div className="w-full h-4/6 p-4 space-y-10">
							{/* <div className="w-full h-80 p-4 space-y-10 border-b-2 border-gray-200"> */}
							<div className="">
								<p className="text-xl text-gray-400 mb-1">Issue</p>
								<p className="text-sm text-purple-400 underline cursor-pointer">
									Ambot unsa ni naa diri lol
								</p>
							</div>
							<div className="">
								<p className="text-xl text-gray-400 mb-1">Section</p>
								<p className="text-sm text-gray-400">Article</p>
							</div>
							<div className="">
								<p className="text-xl text-gray-400 mb-1">Ratings</p>

								{/* <Box
									sx={{
										width: 220,
										display: "flex",
										alignItems: "center",
										color: "#7c139c",
										fontWeight: 600,
									}}
								>
									<Rating
										name="hover-feedback"
										value={value}
										precision={0.5}
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										onChangeActive={(event, newHover) => {
											setHover(newHover);
										}}
										emptyIcon={
											<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
										}
									/>
									{value !== null && (
										<Box sx={{ ml: 2 }}>
											{labels[hover !== -1 ? hover : value]}
										</Box>
									)}
								</Box> */}
								<div className="flex items-center">
									<Box
										sx={{
											"& > legend": { mt: 2 },
											// bgcolor: "#4369bf",
											mr: 2,
										}}
									>
										<Rating name="read-only" value={value} readOnly />
									</Box>

									<DialogComponent
										title="Rate"
										context="Please rate this article"
										maxWidth="sm"
										button={<Button variant="contained">Rate here</Button>}
										action={{ label: "Submit" }}
										// action={{ label: "Submit", handler: handleSubmit }}
									>
										<div className="mt-2 flex justify-center">
											<Box
												sx={{
													"& > legend": { mt: 2 },
												}}
											>
												<Rating
													name="simple-controlled"
													value={value}
													onChange={(event, newValue) => {
														setValue(newValue);
													}}
													sx={{ fontSize: "34px" }}
												/>
											</Box>
										</div>
									</DialogComponent>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutArticles;
