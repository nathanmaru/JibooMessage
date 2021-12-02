import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../../../../../../../hooks/useFetch";
import {
	getArticles,
	getnewArticles,
} from "../../../../../../../../store/articleSlice";

import {
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	Avatar,
	Typography,
} from "@mui/material";

const DepartmentArticles = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const articlesState = useFetch;
	useEffect(() => {
		dispatch(getnewArticles(`/post/?search=${id}`));
	}, []);
	const fetchedArticles = useSelector((state) => state.article.articles);
	const { items: articles } = articlesState(fetchedArticles);

	// use articles variable to map articles

	//dialog
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className="flex w-full justify-end mb-4 bg-red-50">
				<div className="flex">
					<Button variant="contained">Add Article</Button>
				</div>
			</div>

			<div
				className="px-1 overflow-y-auto bg-blue-50"
				style={{ maxHeight: "600px", minHeight: "600px" }}
			>
				{articles.map((item) => {
					<Card
						sx={{
							height: "270px",
							width: "1000px",
							padding: 2,
							border: 1,
							borderColor: "#e6e6e6",
						}}
					>
						<div className="flex flex-row items-center">
							<Avatar
								alt="Remy Sharp"
								src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
							/>
							<Typography
								gutterBottom
								variant="h6"
								component="div"
								sx={{
									ml: 1,
									fontSize: "18px",
									fontWeight: 500,
									color: "#1056a1",
								}}
							>
								{item.author}
							</Typography>
						</div>

						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ ml: 6, mt: -1, fontSize: "12px" }}
						>
							added an article
						</Typography>

						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								ml: 6,
								mt: 2,
								fontSize: "18px",
								fontWeight: 700,
							}}
						>
							{item.title}
						</Typography>

						<div className="ml-12 mt-2 flex flex-row items-center">
							<p className="bg-purple-200 text-purple-500 text-sm w-20 px-2 py-1 flex items-center justify-center rounded-md">
								Article
							</p>

							<p className="text-sm text-gray-400 ml-2">{item.date}</p>
							<p className="text-sm text-gray-400 ml-1">•</p>
							<p className="text-sm text-gray-400 ml-1">{item.reads}</p>
						</div>

						<div className="ml-12 mt-4 flex flex-row items-center">
							<Avatar
								alt="Remy Sharp"
								src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
								sx={{ width: 20, height: 20, ml: 1 }}
							/>
							<p className="text-sm text-gray-600 ml-1">{item.author}</p>
						</div>

						<Divider sx={{ m: 2 }} />

						<div className="ml-12 mt-4 mr-4 flex justify-end items-center w-full">
							<Button variant="outlined" sx={{ mr: 8 }}>
								Open Article
							</Button>
						</div>
					</Card>;
				})}
			</div>
		</>
	);
};

export default DepartmentArticles;
