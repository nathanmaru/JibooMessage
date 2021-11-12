import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from "query-string";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import JoinedProfilePicture from "./JoinedProfilePicture";

//Reusable
import PageManagerComponent from "../../components/reuseableComponents/pageManagerComponent";

//Tabs
import DiscoverArticles from "./tabs/DiscoverArticles";
import FeaturedArticles from "./tabs/FeaturedArticles";
import Staff from "./tabs/Staff";
import Resources from "./tabs/Resources";

const Input = styled("input")({
	display: "none",
});

const JoinProfile = () => {
	// Profile
	const [cover, setCover] = useState();
	const [profile, setProfile] = useState({
		institution_name: "",
		username: "",
		about: "",
	});
	// const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (user) {
			setCover(user.cover);
			setProfile({
				institution_name: user.first_name,
				username: user.username,
				about: user.about,
			});
		}
	}, [user]);

	const onChange = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setCover(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		// console.log(profile);
		let form_data = new FormData();
		form_data.append("cover", e.target.files[0], e.target.files[0].name);
		form_data.append("first_name", user.first_name);
		form_data.append("last_name", user.last_name);
		form_data.append("email", user.email);
		form_data.append("username", user.username);
		form_data.append("is_verified", user.is_verified);
		// dispatch(editProfileCover(user.id, form_data));
		// console.log(e.target.files[0]);
	};

	const location = useLocation();
	const { tab } = queryString.parse(location.search);
	const { id } = useParams();

	const [value, setValue] = useState(tab);

	const handleChangeTab = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = [
		{
			label: "Discover Articles",
			link: `/joined/${id}?tab=discover-articles`,
			value: "discover-articles",
			component: <DiscoverArticles id={id} />,
		},
		{
			label: "Featured Articles",
			link: `/joined/${id}?tab=featured-articles`,
			value: "featured-articles",
			component: <FeaturedArticles />,
		},
		{
			label: "Staff",
			link: `/joined/${id}?tab=staff`,
			value: "staff",
			component: <Staff />,
		},
		{
			label: "Resources",
			link: `/joined/${id}?tab=resources`,
			value: "resources",
			component: <Resources />,
		},
	];
	return (
		<>
			<Card sx={{ maxWidth: "100%", mb: "35px" }}>
				<CardMedia
					component="div"
					height="140"
					image={cover}
					alt="green iguana"
					className="flex justify-end items-center"
					sx={{
						minHeight: "300px",
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "end",
					}}
				>
					<label htmlFor="contained-button-file">
						<Input
							accept="image/*"
							id="contained-button-file"
							onChange={(e) => onChange(e)}
							type="file"
						/>
						<Button
							variant="contained"
							startIcon={<PhotoCamera />}
							style={{
								marginRight: "10px",
								marginBottom: "10px",
								backgroundColor: "white",
								color: "rgba(55, 65, 81, 1)",
								textTransform: "capitalize",
							}}
							component="span"
						>
							Change Cover Photo
						</Button>
					</label>
				</CardMedia>

				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div>
						<JoinedProfilePicture />
					</div>
					<div className="text-xl font-semibold">
						{/* {profile.first_name} {profile.last_name} */} Cebu Technological
						University
					</div>
					<div className="text-sm text-gray-500">
						{/* @{profile.username} */}
						@ctumaincampus
					</div>
					<div className="mt-4 text-base ">
						{/* {profile.about} */}
						mission vision
					</div>

					{/* <ProfileInfo user={user} /> */}
				</CardContent>
			</Card>

			<PageManagerComponent
				value={value}
				handleChange={handleChangeTab}
				tabs={tabs}
			/>
		</>
	);
};

export default JoinProfile;
