import React, { useState } from "react";

//Search Box
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

//Dialog-Modal
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Cards
import JoinedInstitutionCard from "./JoinedInstitutionCard";

//IconButton
import IconButton from "@mui/material/IconButton";

//Icons
import { MdOutlineSchool } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

//Reusable
import DialogComponent from "../../components/reuseableComponents/dialogComponent";
import CardHolder from "../../components/reuseableComponents/cardHolder";
import CardComponent from "../../components/reuseableComponents/cardComponent";

const items = [
	{
		id: "1",
		name: "Cebu Technological University - MC",
		date: "02-22-21",
	},
	{
		id: "2",
		name: "Cebu Normal University",
		date: "02-22-21",
	},
];

const JoinedInstitution = ({ item }) => {
	// Dialog
	const [code, setCode] = useState("");
	const onChange = (e) => setCode({ [e.target.name]: e.target.value });
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div class="flex flex-col w-full space-y-4">
				<div className="w-full flex flex-row justify-between mb-5">
					{/* Search Box */}
					<div className="" style={{ width: "1220px" }}>
						<Box
							component="form"
							sx={{
								"& > :not(style)": {
									m: 0.2,
									width: "100%",
								},
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								id="filled-basic"
								label="Search Staff"
								variant="standard"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<BiSearch className="text-purple-400" />
										</InputAdornment>
									),
								}}
								sx={{
									width: "500px",
									marginBottom: "3px",
									marginTop: "15px",
									marginLeft: "15px",
									padding: "2px",
									fontWeight: "bold",
								}}
							/>
						</Box>
					</div>
					<div className="w-12 flex flex-row justify-between">
						{/* Modal */}
						<div className="ml-auto w-12 h-full flex items-center justify-center">
							<IconButton aria-label="add">
								<MdOutlineSchool onClick={handleClickOpen} />
							</IconButton>

							<DialogComponent
								title="Join Institution Page"
								context="Wa pko kabalo unsa ibutang here lol"
								maxWidth="sm"
								open={open}
								handleClose={handleClose}
								action={
									<Button
										variant="contained"
										onClick={() => {
											handleClose();
											// createProject();
										}}
									>
										Join
									</Button>
								}
							>
								<TextField
									id="outlined-search"
									label="Institution Code"
									variant="outlined"
									name="code"
									value={code}
									onChange={onChange}
									sx={{
										width: "520px",
										marginBottom: "13px",
										marginTop: "15px",
										marginLeft: "15px",
										padding: "2px",
										fontWeight: "bold",
									}}
								/>
							</DialogComponent>
						</div>
					</div>
				</div>

				<div className="flex flex-row flex-wrap w-full items-center lg:justify-start justify-center">
					{/* {items.map((item) => (
						<JoinedInstitutionCard item={item} />
					))} */}
					<CardHolder>
						{items.map((item) => (
							<CardComponent
								item={item}
								link={`/joined/${item.id}?tab=discover-articles`}
							/>
						))}
					</CardHolder>
				</div>
			</div>
		</>
	);
};

export default JoinedInstitution;
