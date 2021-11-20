import React from "react";

import {
	Card,
	CardActions,
	CardContent,
	Divider,
	Button,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

//icons
import {
	MdOutlinePlagiarism,
	MdOutlineSpeakerNotes,
	MdRecommend,
} from "react-icons/md";
import { BiLike } from "react-icons/bi";

const items = [
	{
		id: 1,
		title: "Capstone 2",
		abstract:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet, fringilla mauris. Etiam hendrerit velit vitae sollicitudin pulvinar.",
	},
	{
		id: 2,
		title: "Capstone 2",
		abstract:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet, fringilla mauris. Etiam hendrerit velit vitae sollicitudin pulvinar.",
	},
];

const ClassroomSubmission = ({ item }) => {
	//dialog
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div
				className="px-1 overflow-y-auto"
				style={{ maxHeight: "600px", minHeight: "600px" }}
			>
				{/* Cards Here */}
				{items.map((item) => (
					<Card
						item={item}
						sx={{
							maxHeight: 150,
							minHeight: 150,
							border: 1,
							borderColor: "#d4d4d4",
							mb: 1,
							p: 2,
						}}
					>
						<div className="flex justify-end">
							<Button variant="contained" onClick={handleClickOpen}>
								View Submission
							</Button>
						</div>

						<p className="text-3xl tracking-wider font-semibold">
							{item.title}
						</p>
						<p
							className="text-sm tracking-wider truncate"
							style={{
								maxHeight: "40px",
								minHeight: "40px",
								maxWidth: "1210px",
								minWidth: "1210px",
								padding: 5,
							}}
						>
							{item.abstract}
						</p>
					</Card>
				))}
				{/* <Card
					sx={{
						maxHeight: 150,
						minHeight: 150,
						border: 1,
						borderColor: "#d4d4d4",
						mb: 2,
						p: 2,
					}}
				>
					<div className="flex justify-end">
						<Button variant="contained" onClick={handleClickOpen}>
							View Submission
						</Button>
					</div>

					<p className="text-3xl tracking-wider font-semibold">{item.title}</p>
					<p
						className="text-sm tracking-wider truncate"
						style={{
							maxHeight: "40px",
							minHeight: "40px",
							maxWidth: "1210px",
							minWidth: "1210px",
							padding: 5,
						}}
					>
						{item.abstract}
					</p>
				</Card> */}
			</div>

			{/* Dialog Here  */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
				<DialogTitle>Title</DialogTitle>
				<DialogContent>
					<DialogContentText>Author/s</DialogContentText>

					<div className="mt-1 space-x-3 flex justify-end">
						{/* <Button variant="contained">Plagiarism Check</Button> */}
						<Button variant="text" endIcon={<MdOutlinePlagiarism />}>
							Plagiarism Check
						</Button>
						<Button variant="text" endIcon={<MdOutlineSpeakerNotes />}>
							Call for Revision
						</Button>
					</div>

					<Divider sx={{ m: 2 }} />
					<div
						className="mt-1 text-sm text-justify overflow-y-auto"
						style={{
							maxHeight: "450px",
							minHeight: "450px",
						}}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
						risus euismod, vestibulum nunc sit amet, fringilla mauris. Etiam
						hendrerit velit vitae sollicitudin pulvinar. Vivamus dictum magna
						sit amet ligula sollicitudin maximus.
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={handleClose}
						endIcon={<BiLike />}
						sx={{
							mb: 2,
							mr: 2,
						}}
					>
						Recommend
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ClassroomSubmission;
