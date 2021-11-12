import * as React from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { createNotes } from "../../../store/noteSlice";
import { useDispatch, useSelector } from "react-redux";

import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 650,
	borderRadius: "10px",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export default function CreateNotesModal() {
	const owner = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [noteForm, setForm] = React.useState({
		title: "",
		content: "",
	});

	const { title, content } = noteForm;
	const onChange = (e) =>
		setForm({ ...noteForm, [e.target.name]: e.target.value });

	const handleSubmit = () => {
		const { id } = owner;
		dispatch(createNotes(title, content, id));
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Button
				onClick={handleClickOpen}
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<HiOutlineDocumentAdd className="justify-start text-2xl ml-2" />
				<p className="ml-2 mr-auto text-sm justify-between"> Add Note</p>
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Note</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ fontSize: "14px" }}>
						Keep all your knowledge safe here!
					</DialogContentText>
					<TextField
						id="standard-search"
						label="Title"
						variant="standard"
						name="title"
						value={title}
						onChange={(e) => onChange(e)}
						sx={{
							width: "520px",
							marginBottom: "3px",
							marginTop: "15px",
							marginLeft: "15px",
							padding: "2px",
							fontWeight: "bold",
						}}
					/>
					<TextField
						id="standard-multiline-static"
						multiline
						rows={4}
						name="content"
						value={content}
						onChange={(e) => onChange(e)}
						variant="standard"
						onChange={(e) => onChange(e)}
						sx={{
							width: "520px",
							marginBottom: "3px",
							marginTop: "10px",
							marginLeft: "15px",
							padding: "2px",
							fontWeight: "bold",
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							handleClose();
							handleSubmit();
						}}
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
