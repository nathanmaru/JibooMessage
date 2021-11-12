import React from "react";
import { Link } from "react-router-dom";

//Card
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTheme } from "@mui/material/styles";

//Icons
import { TiHeartOutline } from "react-icons/ti";
import { RiShareBoxFill } from "react-icons/ri";

const PublishingCardComponent = ({ item, link, image, articleOpen }) => {
	const defaultImage =
		"https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHJlc2VhcmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=600";

	const theme = useTheme();

	return (
		<>
			<Card
				component={Link}
				to={link}
				raised
				className="transition transform hover:-translate-y-1 "
				sx={{ display: "flex", maxHeight: "240px", minHeight: "240x" }}
			>
				<CardMedia
					component="img"
					sx={{ width: 251 }}
					image={image ? image : defaultImage}
					alt="Research"
				/>

				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<CardContent
						sx={{
							flex: "1 0 auto",
							width: "955px",
						}}
					>
						<Typography
							component="div"
							variant="h5"
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							{item.title}
							<Button
								variant="filled"
								sx={{ mt: "-5px" }}
								onClick={articleOpen}
								// onClick={handleClickOpen}
							>
								<Typography
									variant="subtitle1"
									color="primary"
									component="div"
									sx={{
										fontSize: "14px",
									}}
								>
									Publish
								</Typography>
							</Button>
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							component="div"
							sx={{
								// overflow: "hidden",
								// textOverflow: "ellipsis",
								// whiteSpace: "nowrap",
								maxHeight: "100px",
								minHeight: "100px",
								textAlign: "justify",
								fontSize: "14px",
								py: 1,
							}}
						>
							{item.abstract}
						</Typography>
					</CardContent>

					{/* Reactions */}
					<Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
						<IconButton aria-label="previous">
							<TiHeartOutline />
						</IconButton>
						<IconButton aria-label="next">
							<RiShareBoxFill />
						</IconButton>
					</Box>
				</Box>
			</Card>
		</>
	);
};

export default PublishingCardComponent;
