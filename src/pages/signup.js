import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";

import { socialLoginGoogle, signup } from "../store/authSlice";
import InputIconField from "../components/commons/inputIconField";

import purple from "../assets/img/Artboard 1.png";

//mui
import { Typography, Button, TextField } from "@mui/material";

//react-icons
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { AiFillUnlock } from "react-icons/ai";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Signup = () => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		re_password: "",
	});
	const dispatch = useDispatch();

	const { first_name, last_name, email, username, password, re_password } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const handleSubmitSignUp = (e) => {
		e.preventDefault();
		if (password === re_password) {
			dispatch(signup(first_name, last_name, username, email, password));
		} else {
			alert("Password does not match!");
		}
	};
	// useEffect(() => {
	// 	if (user) {
	// 		console.log(user);
	// 		alert('Well done! Now please check your email to activate your account!');
	// 		return <Redirect to='/need/activate'></Redirect>;
	// 	}
	// }, [user]);

	const history = useHistory();

	const continueWithGoogle = () => {
		dispatch(socialLoginGoogle());
	};

	//validation
	const validationMsg = Yup.object().shape({
		first_name: Yup.string().required("First name is required."),
		last_name: Yup.string().required("Last name is required."),
		username: Yup.string().required("Username is required."),
		email: Yup.string()
			.required("Your e-mail is required.")
			.email("Please put the correct e-mail format"),
		password: Yup.string()
			.required("Password is required.")
			.min(6, "Password must have atleast 6 characters."),
		re_password: Yup.string()
			.required("Confirm password is required.")
			.oneOf([Yup.ref("password"), null], "Confim password does not match"),
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

		if (data.password === data.re_password) {
			dispatch(
				signup(
					data.first_name,
					data.last_name,
					data.username,
					data.email,
					data.password
				)
			);
		}
	};

	return (
		<div class="flex flex-wrap w-full">
			<div class="flex flex-col w-full md:w-1/2">
				<div class="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
					<Link to="/" class="p-4 text-xl font-bold text-white bg-purple-800">
						meegu.
					</Link>
				</div>
				<div class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
					<p class="text-3xl text-center mt-3">Start your journey!</p>
					<form
						class="flex flex-col pt-3 md:pt-8 space-y-1"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="mt-10">
							<TextField
								variant="outlined"
								fullWidth
								name="first_name"
								placeholder="First Name"
								// value={password}
								// onChange={(e) => onChange(e)}
								{...register("first_name")}
								error={errors.first_name ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.first_name?.message}
							</Typography>
						</div>

						<div>
							<TextField
								name="last_name"
								placeholder="Your Last Name"
								fullWidth
								variant="outlined"
								// value={last_name}
								// onChange={(e) => onChange(e)}
								{...register("last_name")}
								error={errors.last_name ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.last_name?.message}
							</Typography>
						</div>

						<div>
							<TextField
								name="username"
								placeholder="Your Username"
								fullWidth
								variant="outlined"
								// value={username}
								// onChange={(e) => onChange(e)}
								{...register("username")}
								error={errors.username ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.username?.message}
							</Typography>
						</div>
						<div>
							<TextField
								name="email"
								placeholder="Your email"
								fullWidth
								variant="outlined"
								// value={email}
								// onChange={(e) => onChange(e)}
								{...register("email")}
								error={errors.email ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.email?.message}
							</Typography>
						</div>
						<div>
							<TextField
								name="password"
								placeholder="Your password"
								fullWidth
								variant="outlined"
								type="password"
								// value={password}
								// onChange={(e) => onChange(e)}
								{...register("password")}
								error={errors.password ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.password?.message}
							</Typography>
						</div>
						<div>
							<TextField
								name="re_password"
								placeholder="Re-enter your password"
								fullWidth
								variant="outlined"
								type="password"
								// value={re_password}
								// onChange={(e) => onChange(e)}
								{...register("re_password")}
								error={errors.re_password ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.re_password?.message}
							</Typography>
						</div>

						<div className="flex justify-end">
							<Button type="submit" variant="contained">
								Sign up
							</Button>
						</div>
					</form>

					<div className="flex flex-row justify-between">
						<div class="pt-12 pb-12 text-center justify-start">
							<p>
								<Link
									to="/login"
									class="ml-2 text-gray-400 hover:text-purple-400"
								>
									Login
								</Link>
							</p>
						</div>

						{/* <div className="mt-9 justify-between">
							<button
								onClick={(e) => handleSubmitSignUp(e)}
								type="submit"
								class="w-36 px-4  py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-purple-800 shadow-md hover:text-purple-800 hover:bg-white focus:outline-none focus:ring-2 rounded-md"
							>
								<span class="w-full">Sign Up</span>
							</button>
						</div> */}
					</div>
				</div>
				<div className="flex flex-row justify-between mb-3 px-10 ">
					<div className="text-gray-500">Continue with: </div>

					<button
						onClick={continueWithGoogle}
						type="button"
						className="text-purple-400  "
					>
						Google
					</button>
				</div>
			</div>
			<div class="w-1/2 shadow-2xl">
				<img
					class="hidden object-center w-full h-screen md:block"
					src={purple}
					alt="signup"
				/>
			</div>
		</div>
	);
};

export default Signup;
