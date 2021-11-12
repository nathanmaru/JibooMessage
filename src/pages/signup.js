import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { socialLoginGoogle, signup } from '../store/authSlice';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import InputIconField from '../components/commons/inputIconField';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import { AiFillUnlock } from 'react-icons/ai';
import purple from '../assets/img/Artboard 1.png';

const Signup = () => {
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: '',
		re_password: '',
	});
	const dispatch = useDispatch();

	const { first_name, last_name, email, username, password, re_password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === re_password) {
			dispatch(signup(first_name, last_name, username, email, password));
		} else {
			alert('Password does not match!');
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

	return (
		<div class='flex flex-wrap w-full'>
			<div class='flex flex-col w-full md:w-1/2'>
				<div class='flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24'>
					<Link to='/' class='p-4 text-xl font-bold text-white bg-purple-800'>
						meegu.
					</Link>
				</div>
				<div class='flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32'>
					<p class='text-3xl text-center'>Start your journey!</p>
					<form class='flex flex-col pt-3 md:pt-8 space-y-1'>
						<div>
							<InputIconField
								icon={<BsFillPersonFill className='h-4 w-4' />}
								name='first_name'
								placeholder='Your First Name'
								value={first_name}
								onChange={(e) => onChange(e)}
								type='text'
							/>
						</div>
						<div>
							<InputIconField
								icon={<BsFillPersonFill className='h-4 w-4' />}
								name='last_name'
								placeholder='Your Last Name'
								value={last_name}
								onChange={(e) => onChange(e)}
								type='text'
							/>
						</div>
						<div>
							<InputIconField
								icon={<BsFillPersonFill className='h-4 w-4' />}
								name='username'
								placeholder='Your Username'
								value={username}
								onChange={(e) => onChange(e)}
								type='text'
							/>
						</div>
						<div>
							<InputIconField
								icon={<IoMdMail className='h-4 w-4' />}
								name='email'
								placeholder='Your email'
								value={email}
								onChange={(e) => onChange(e)}
								type='email'
							/>
						</div>
						<div>
							<InputIconField
								icon={<AiFillUnlock className='h-4 w-4' />}
								name='password'
								placeholder='Your password'
								value={password}
								onChange={(e) => onChange(e)}
								type='password'
							/>
						</div>
						<div>
							<InputIconField
								icon={<AiFillUnlock className='h-4 w-4' />}
								name='re_password'
								placeholder='Re-enter your password'
								value={re_password}
								onChange={(e) => onChange(e)}
								type='password'
							/>
						</div>
					</form>

					<div className='flex flex-row justify-between'>
						<div class='pt-12 pb-12 text-center justify-start'>
							<p>
								<Link to='/login' class='ml-2 text-gray-400 hover:text-purple-400'>
									Login
								</Link>
							</p>
						</div>

						<div className='mt-9 justify-between'>
							<button
								onClick={(e) => handleSubmit(e)}
								type='submit'
								class='w-36 px-4  py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-purple-800 shadow-md hover:text-purple-800 hover:bg-white focus:outline-none focus:ring-2 rounded-md'
							>
								<span class='w-full'>Sign Up</span>
							</button>
						</div>
					</div>
				</div>
				<div className='flex flex-row justify-between mb-12 px-10 '>
					<div className='text-gray-500'>Continue with: </div>

					<button onClick={continueWithGoogle} type='button' className='text-purple-400  '>
						Google
					</button>
				</div>
			</div>
			<div class='w-1/2 shadow-2xl'>
				<img class='hidden object-center w-full h-screen md:block' src={purple} alt='signup' />
			</div>
		</div>
	);
};

export default Signup;
