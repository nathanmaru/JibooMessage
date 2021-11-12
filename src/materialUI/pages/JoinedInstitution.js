import React from "react";

//Search Box 
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//Cards
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import JoinedInstitutionCard from "../components/JoinedInstitutionCard";



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
	{
		id: "3",
		name: "Cebu Technological University - Danao",
		date: "04-22-21",
	},
	{
		id: "4",
		name: "Cebu Technological University - Danao",
		date: "04-22-21",
	},
	{
		id: "5",
		name: "Cebu Technological University - Danao",
		date: "04-22-21",
	},
	{
		id: "6",
		name: "Cebu Technological University - Danao",
		date: "04-22-21",
	},
];

const JoinedInstitution = ({ item }) => {

	return (
		<>
			<div class="flex flex-col w-full space-y-4">
				<div className="w-full p-2">
					<Box
						component="form"
						sx={{ "& > :not(style)": { m: 0.2, width: "100%" } }}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="filled-basic"
							label="Search Institution"
							variant="standard"
							sx={{
								width: "520px",
								marginBottom: "3px",
								marginTop: "15px",
								marginLeft: "15px",
								padding: "2px",
								fontWeight: "bold",
							}}
						/>
					</Box>
				</div>

				<div className="flex flex-row flex-wrap w-full items-center px-16 lg:justify-start justify-center">
					{items.map((item) => (
						<JoinedInstitutionCard item={item} />
					))}
				</div>
			</div>
		</>
	);
};

export default JoinedInstitution;
