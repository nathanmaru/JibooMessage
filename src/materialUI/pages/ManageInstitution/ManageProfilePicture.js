import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// import { editProfileImg } from "../store/authSlice";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
	display: "none",
});

export default function ManageProfilePicture() {
	// const dispatch = useDispatch();
	const [profile, setProfile] = useState();
	const { user } = useSelector((state) => state.auth);

	const onChange = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setProfile(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		// console.log(profile);
		let form_data = new FormData();
		form_data.append("image", e.target.files[0], e.target.files[0].name);
		form_data.append("first_name", user.first_name);
		form_data.append("last_name", user.last_name);
		form_data.append("email", user.email);
		form_data.append("username", user.username);
		form_data.append("is_verified", user.is_verified);
		// dispatch(editProfileImg(user.id, form_data));
		// console.log(e.target.files[0]);
	};

	useEffect(() => {
		if (user) {
			setProfile(user.image);
		}
	}, [user]);
	return (
		<>
			{profile ? (
				<div className="-mt-36">
					<label htmlFor="icon-button-file">
						<Input
							accept="image/*"
							// src={pic}
							// value={profile}
							name="pic"
							id="icon-button-file"
							type="file"
							onChange={(e) => onChange(e)}
						/>
						<IconButton aria-label="upload picture" component="span">
							{/* <PhotoCamera /> */}
							<Avatar
								alt="Remy Sharp"
								// src={profile}
								src="https://images.unsplash.com/photo-1584121068263-7c2e21a9b838?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGluc3RpdHV0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
								sx={{
									width: "10rem",
									height: "10rem",
									border: "3px solid #838CFF",
								}}
							/>
						</IconButton>
					</label>
				</div>
			) : null}
		</>
	);
}
