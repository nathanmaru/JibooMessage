import React from "react";
import { Link } from "react-router-dom";

//Card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const JoinedInstitutionCard = ({ item }) => {
	return (
		<>
			<Card
				component={Link}
				to={`/joined/${item.id}?item=${item.id}`}
				sx={{ width: 345, height: 345, borderRadius: "0.75rem", m: 2 }}
				raised
				className="transition transform hover:-translate-y-1 "
			>
				<CardMedia
					component="img"
					image="https://images.unsplash.com/photo-1543505298-b8be9b52a21a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW5zdGl0dXRpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=600"
					alt="green iguana"
					sx={{ maxHeight: "200px", minHeight: "200px" }}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{item.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{item.description}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default JoinedInstitutionCard;
