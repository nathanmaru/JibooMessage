import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Validate = () => {
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");

	const [firstNameErr, setFirstNameErr] = useState({});
	const [emailErr, setEmailErr] = useState({});
	const [mobileErr, setMobileErr] = useState({});

	const onSubmit = (e) => {
		e.preventDefault();
		const isValid = formValidation();

		if (isValid) {
			setFirstName("");
			setEmail("");
			setMobile("");
		}
	};

	const formValidation = () => {
		const firstNameErr = {};
		const emailErr = {};
		const mobileErr = {};

		let isValid = true;

		// if (!firstName.trim.length > 0) {
		// 	firstNameErr.firstNameErrMsg = "This field is required.";
		// 	isValid = false;
		// }

		if (!email.includes("@")) {
			emailErr.emailErrMsg = "Invalid email adress.";
			isValid = false;
		}

		if (!mobile.trim.length == 11) {
			mobileErr.MobileErrMsg = "Maximum of 11 numbers only.";
			isValid = false;
		}

		// if (mobile.trim.length < 5) {
		// 	mobileErr.MobileErrMsg = "Your mobile number is too short.";
		// 	isValid = false;
		// }

		setFirstNameErr(firstNameErr);
		setEmailErr(emailErr);
		setMobileErr(mobileErr);

		return isValid;
	};
	return (
		<>
			<div className="bg-gray-50 p-4">
				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
					}}
					onSubmit={onSubmit}

					//   noValidate
					//   autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						label="First Name"
						variant="outlined"
						required
						sx={{
							width: "400px",
						}}
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>
					{Object.keys(firstNameErr).map((key) => {
						return (
							<div style={{ color: "red", fontSize: "13px" }}>
								{firstNameErr[key]}
							</div>
						);
					})}
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						required
						sx={{
							width: "400px",
							mt: 3,
						}}
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					{Object.keys(emailErr).map((key) => {
						return (
							<div style={{ color: "red", fontSize: "13px" }}>
								{emailErr[key]}
							</div>
						);
					})}
					<TextField
						id="outlined-basic"
						label="Mobile Number"
						variant="outlined"
						required
						sx={{
							width: "400px",
							mt: 3,
						}}
						value={mobile}
						onChange={(e) => {
							setMobile(e.target.value);
						}}
					/>
					{Object.keys(mobileErr).map((key) => {
						return (
							<div style={{ color: "red", fontSize: "13px" }}>
								{mobileErr[key]}
							</div>
						);
					})}

					{/* <Button variant="contained">Submit</Button> */}
					<button
						type="submit"
						className="bg-purple-600 mt-5 p-2 text-white rounded-md"
						style={{ width: "400px" }}
					>
						Submit
					</button>
				</Box>
			</div>
		</>
	);
};

export default Validate;
