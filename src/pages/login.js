import { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { socialLoginFacebook, login, socialLoginGoogle } from '../store/authSlice';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import InputIconField from '../components/commons/inputIconField';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import { AiFillUnlock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
import purple from '../assets/img/Artboard 1.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch();

	const { email, password } = formData;

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		debugger;
		dispatch(login(email, password));
	};
	const history = useHistory();

	const responseGoogle = (response, e) => {
		console.log(response);
		dispatch(socialLoginGoogle(response.accessToken));
	};

	const responseFacebook = (response) => {
		console.log(response);
		// dispatch(socialLoginFacebook(response.accessToken));
	};

	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div class='flex flex-wrap w-full'>
				<div class='flex flex-col w-full md:w-1/2'>
					<div class='flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24'>
						<Link to='/' class='p-4 text-xl font-bold text-white bg-purple-800'>
							meegu.
						</Link>
					</div>
					<div class='flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32'>
						<p class='text-3xl text-center'>Welcome back!</p>
						<Box
							component='form'
							sx={{
								'& > :not(style)': { m: 1, width: '500px' },
							}}
							noValidate
							autoComplete='off'
							className='flex flex-col pt-3 md:pt-8 space-y-2 w-full'
						>
							<TextField
								variant='outlined'
								fullWidth
								name='email'
								placeholder='Your email'
								value={email}
								onChange={(e) => onChange(e)}
								type='email'
							/>
							<TextField
								variant='outlined'
								fullWidth
								name='password'
								placeholder='Your password'
								value={password}
								onChange={(e) => onChange(e)}
								type='password'
							/>

							<div className='flex flex-row justify-between'>
								<div class='pt-12 pb-12 text-center justify-start'>
									<p>
										<Link
											to='/signup'
											className='text-base ml-2 text-gray-400 hover:text-purple-400'
										>
											Register
										</Link>
									</p>
								</div>

								<div class='pt-12 pb-12 text-center justify-start'>
									<p>
										<Link
											to='/reset-password'
											class='-ml-8 text-gray-400 hover:text-purple-400'
										>
											Forgot your password?
										</Link>
									</p>
								</div>

								<div className='mt-9 justify-between'>
									<button
										onClick={(e) => handleSubmit(e)}
										type='submit'
										class='w-36 px-4  py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-purple-800 shadow-md hover:text-purple-800 hover:bg-white focus:outline-none focus:ring-2 rounded-md'
									>
										<span class='w-full'>Log in</span>
									</button>
								</div>
							</div>
							<div className='flex flex-row justify-between mb-12 px-10'>
								<div className='text-gray-500'>Continue with: </div>
								<div class='flex flex-row space-x-6 pr-10'>
									<div>
										<FacebookLogin
											appId='564451954655803'
											autoLoad={false}
											fields='name,email,picture'
											callback={responseFacebook}
											render={(renderProps) => (
												<button
													onClick={renderProps.onClick}
													className='text-purple-400'
												>
													Facebook
												</button>
											)}
										/>
									</div>
									<div>
										<GoogleLogin
											clientId='1090422806656-3gpck8pb13jj38c9bp25pmuqe6scgsb1.apps.googleusercontent.com'
											render={(renderProps) => (
												<button
													onClick={renderProps.onClick}
													disabled={renderProps.disabled}
													className='text-purple-400'
												>
													Google
												</button>
											)}
											onSuccess={(e) => responseGoogle(e)}
											onFailure={(e) => responseGoogle(e)}
										/>
									</div>
								</div>
							</div>
						</Box>
						{/* <form class='flex flex-col pt-3 md:pt-8 space-y-2'>
						</form> */}
					</div>
				</div>
				<div class='w-1/2 shadow-2xl'>
					<img
						class='hidden object-center w-full h-screen md:block'
						src={purple}
						alt='login'
					/>
				</div>
			</div>
		</>
	);
};

export default Login;
