import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//mui
import {
	TextField,
	Button,
	InputLabel,
	Input,
	MenuItem,
	FormControl,
	Select,
	Card,
	CardMedia,
	Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import useStatus from "../../../hooks/useStatus";
import FeedBackButton from "../../../hooks/feedBackButton";
import { addAdviserClassroom } from "../../../store/newClassroomSlice";
import { createInstitution } from "../../../store/newInstitutionSlice";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//contact-no
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

// const InputStyled = styled("input")({
// 	display: "none",
// });

//contact validation
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="(+#0) 000-0000-000"
			definitions={{
				"#": /[1-9]/,
			}}
			inputRef={ref}
			onAccept={(value) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

TextMaskCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const InstitutionDetails = () => {
	const defaultImage =
		"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
	const dispatch = useDispatch();
	const [inputForm, setInputForm] = useState({
		name: "",
		address: "",
		contact: "",
		email: "",
		website: "",
		privacy: "public",
		description: "",
		cover: defaultImage,
		coverFile: defaultImage,
	});

	const { status } = useSelector((state) => state.class);
	const { loading } = useStatus(status);
	const handleClassroomDetail = () => {
		let form_data = new FormData();
		const {
			name,
			address,
			contact,
			email,
			website,
			privacy,
			description,
			cover,
			coverFile,
		} = inputForm;
		if (coverFile != defaultImage) {
			form_data.append("cover", coverFile, coverFile.name);
		}
		form_data.append("name", name);
		form_data.append("address", address);
		form_data.append("contact", contact);
		form_data.append("email", email);
		form_data.append("website", website);
		form_data.append("privacy", privacy);
		form_data.append("description", description);
		dispatch(createInstitution(form_data));
	};
	console.log(inputForm.coverFile);
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == "cover") {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setInputForm({
					...inputForm,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	};

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required("Institution Name is required."),
		address: Yup.string().required("Address is required"),
		email: Yup.string()
			.required("Email is required.")
			.email("Email is invalid."),
		contact: Yup.string().matches(new RegExp("[0-9]{11}")),
		website: Yup.string().matches(
			/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
			"Please enter correct URL format"
		),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));
	};

	//contact-no
	const [values, setValues] = useState({
		textmask: "(+63)",
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-2 gap-4 mt-4">
				{/* <form onSubmio={handleSubmit(onSubmit)}> */}
				<div className="flex flex-col space-y-3">
					<Card sx={{ maxWidth: "100%" }}>
						<CardMedia
							component="div"
							image={inputForm.cover}
							className="flex justify-end items-center"
							sx={{
								height: "190px",
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "end",
							}}
						>
							<label htmlFor="contained-button-file">
								<Input
									accept="image/*"
									id="contained-button-file"
									name="cover"
									onChange={onChange}
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
					</Card>

					{/* Fields with validation */}
					<TextField
						label="Institution Name"
						variant="outlined"
						name="name"
						// value={inputForm.name}
						// onChange={(e) => onChange(e)}
						{...register("name")}
						error={errors.name ? true : false}
					/>
					<Typography
						sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
					>
						{errors.name?.message}
					</Typography>

					<TextField
						label="Address"
						variant="outlined"
						name="address"
						// value={inputForm.address}
						// onChange={(e) => onChange(e)}
						{...register("address")}
						error={errors.address ? true : false}
					/>
					<Typography
						sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
					>
						{errors.address?.message}
					</Typography>

					<TextField
						label="Institution E-mail"
						variant="outlined"
						name="email"
						// value={inputForm.email}
						// onChange={(e) => onChange(e)}
						{...register("email")}
						error={errors.email ? true : false}
					/>
					<Typography
						sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
					>
						{errors.email?.message}
					</Typography>
				</div>
				{/* </form> */}

				{/* Right Side */}
				<div className=" flex flex-col space-y-3 ">
					{/* <TextField
						label="Contact No."
						variant="outlined"
						name="contact"
						value={inputForm.contact}
						onChange={(e) => onChange(e)}
					/> */}
					<FormControl fullWidth>
						<InputLabel htmlFor="formatted-text-mask-input">
							Mobile Number
						</InputLabel>
						<Input
							value={values.textmask}
							onChange={handleChange}
							name="textmask"
							variant="contained"
							id="formatted-text-mask-input"
							inputComponent={TextMaskCustom}
							sx={{ mb: 2 }}
						/>
					</FormControl>

					<TextField
						label="Institution Website (Optional)"
						variant="outlined"
						name="website"
						// value={inputForm.website}
						// onChange={(e) => onChange(e)}
						{...register("website")}
						error={errors.website ? true : false}
					/>
					<Typography
						sx={{ fontSize: "12px", color: "red", fontStyle: "italic", mb: 1 }}
					>
						{errors.website?.message}
					</Typography>

					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Privacy</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={inputForm.privacy}
							label="Privacy"
							name="privacy"
							onChange={(e) => onChange(e)}
						>
							<MenuItem value={"public"}>Public</MenuItem>
							<MenuItem value={"private"}>Private</MenuItem>
						</Select>
					</FormControl>
					<TextField
						label="Description"
						variant="outlined"
						name="description"
						value={inputForm.description}
						onChange={(e) => onChange(e)}
						multiline
						minRows={4}
					/>
					<div className="flex justify-end">
						{/* <Button onClick={handleClassroomDetail} variant="contained"> */}
						<Button type="submit" variant="contained">
							Create Institution
						</Button>
						{/* <FeedBackButton
						button={
							<LoadingButton
								onClick={handleClassroomDetail}
								loading={loading}
								type='submit'
								variant='contained'
							>
								Create Classroom
							</LoadingButton>
						}
						status={status}
					/> */}
					</div>
				</div>
			</div>
		</form>
	);
};

export default InstitutionDetails;
