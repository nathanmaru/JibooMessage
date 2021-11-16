import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const userSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		image: null,
		isLoading: false,
		isAuthenticated: false,
	},
	reducers: {
		//actions => action handlers
		//use this when you talk to the state

		userLoggedInSuccess: (state, action) => {
			console.log(action.payload);
			localStorage.setItem('access_token', action.payload.access_token);
			localStorage.setItem('refresh_token', action.payload.refresh_token);
			state.isAuthenticated = true;
			toast.update(toastId, {
				render: 'Login Successfully',
				type: 'success',
				autoClose: 1000,
				isLoading: false,
			});
			window.location.href = '/home'; //alisdan ni para dili mu whole page refresh
		},
		userLoggedInFailed: (state, action) => {
			console.log();
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.isAuthenticated = false;
			toast.update(toastId, {
				render: `Login Failed Reason: ${action.payload.error_description}`,
				type: 'error',
				autoClose: 3000,
				isLoading: false,
			});
		},
		loginRequest: (state, action) => {
			toastId = toast.loading('Please wait...');
		},

		userRegisteredSuccess: (state, action) => {
			console.log(action.payload);
			state.user = action.payload;
			toast.update(toastId, {
				render:
					'Register Successfully! You can now login to your account. And activate your account.',
				type: 'success',
				autoClose: 3000,
				isLoading: false,
			});
			alert('Sign up success you can now login! ');
			window.location.href = '/login/';
		},
		userRegisteredFailed: (state, action) => {
			alert('Sign up failed! ');
		},
		registerRequest: (state, action) => {
			toastId = toast.loading('Please wait...');
		},

		userLoggedOut: (state, action) => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.isAuthenticated = false;
		},
		userLoadedSuccess: (state, action) => {
			state.user = action.payload;
		},
		userLoadedFailed: (state, action) => {
			// state.user = null;
			window.location.href = '/login/';
		},
		userEditSuccess: (state, action) => {
			console.log(action.payload, 'payload');
			state.user = action.payload;
			alert('Profile edit success!');
		},
		userEditFailed: (state, action) => {
			// state.user = null;
			alert('Profile edit failed!');
		},
		logoutRequest: (state, action) => {
			toastId = toast.loading('Please wait...');
		},
		logoutSuccess: (state, action) => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.isAuthenticated = false;
			toast.update(toastId, {
				render: 'logout Successfully.',
				type: 'success',
				autoClose: 50,
				isLoading: false,
			});
		},
		logoutFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Logout Failed',
				type: 'error',
				autoClose: 3000,
				isLoading: false,
			});
		},
		loadImageSuccess: (state, action) => {
			state.image = action.payload;
		},
		loadImageFailed: (state, action) => {},

		verifyUserRequest: (state, action) => {
			state.isLoading = true;
		},
		verifyUserSuccess: (state, action) => {
			if (state.user) {
				state.user.is_verified = true;
			}
			alert('Hooray your are now verified!');
			window.location.href = '/home';
		},
		verifyUserFailed: (state, action) => {
			alert('Sorry the verification failed.\n' + action.payload);
		},
	},
});

const {
	logoutRequest,
	logoutSuccess,
	logoutFailed,
	loginRequest,
	userLoadedSuccess,
	userLoadedFailed,
	userEditSuccess,
	userEditFailed,
	userRegisteredSuccess,
	userRegisteredFailed,
	registerRequest,
	userLoggedInSuccess,
	userLoggedInFailed,
	loadImageSuccess,
	loadImageFailed,
	verifyUserRequest,
	verifyUserSuccess,
	verifyUserFailed,
} = userSlice.actions;

export default userSlice.reducer;

//action creators

export const verifyUser = (token) =>
	apiCallBegan({
		url: `/api/user/email-verify?token=` + token,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: verifyUserRequest.type,
		onSuccess: verifyUserSuccess.type,
		onError: verifyUserFailed.type,
	});

export const login = (email, password) =>
	apiCallBegan({
		url: 'auth/token/',
		method: 'post',
		data: {
			grant_type: 'password',
			username: email,
			password: password,
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
		},
		onSuccess: userLoggedInSuccess.type,
		onStart: loginRequest.type,
		onError: userLoggedInFailed.type,
	});

export const signup = (first_name, last_name, username, email, password) =>
	apiCallBegan({
		url: '/api/user/register/',
		method: 'post',
		data: {
			first_name,
			last_name,
			email,
			username,
			password,
		},
		onSuccess: userRegisteredSuccess.type,
		onError: userRegisteredFailed.type,
		onStart: registerRequest.type,
	});
export const socialLoginFacebook = (accesstoken) =>
	apiCallBegan({
		url: '/auth/convert-token/',
		method: 'post',
		data: {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
		},
		onStart: loginRequest.type,
		onSuccess: userLoggedInSuccess.type,
		onError: userLoggedInFailed.type,
	});
export const socialLoginGoogle = (accesstoken) =>
	apiCallBegan({
		url: '/auth/convert-token/',
		method: 'post',
		data: {
			token: accesstoken,
			backend: 'google-oauth2',
			grant_type: 'convert_token',
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
		},
		onStart: loginRequest.type,
		onSuccess: userLoggedInSuccess.type,
		onError: userLoggedInSuccess.type,
	});

export const loadUser = () =>
	apiCallBegan({
		url: '/api/user/me/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onSuccess: userLoadedSuccess.type,
		onError: userLoadedFailed.type,
	});

export const logout = (req, res) =>
	apiCallBegan({
		url: '/auth/invalidate-sessions',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { client_id: process.env.REACT_APP_CLIENT_ID },
		onStart: logoutRequest.type,
		onSuccess: logoutSuccess.type,
		onError: logoutFailed.type,
	});

export const editProfile = (first_name, last_name, username, email, about, id) =>
	apiCallBegan({
		url: `/api/user/me/edit/${id}/`,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: {
			first_name,
			last_name,
			email,
			about,
			username,
		},
		onSuccess: userEditSuccess.type,
		onError: userEditFailed.type,
	});
export const editProfileImage = (id, form_data) =>
	apiCallBegan({
		url: `/api/user/me/edit/${id}/`,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		type: 'regular',
		data: form_data,
		onSuccess: userEditSuccess.type,
		onError: userEditFailed.type,
	});

export const loadImageUser = (id) =>
	apiCallBegan({
		url: `/api/user/profile/${id}`,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',

		onSuccess: loadImageSuccess.type,
		onError: loadImageFailed.type,
	});
///selectors

export const getUser = createSelector(
	(state) => state.user.user,
	(user) => user
);
