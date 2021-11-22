import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState: {
		plans: [],
		subscriptions: [],
		status: 'idle',
	},
	reducers: {
		planLoadRequest: (state, action) => {
			state.status = 'loading';
		},
		planLoadSuccess: (state, action) => {
			state.status = 'success';
			console.log(action.payload);
			state.plans = action.payload;
		},
		planLoadFailed: (state, action) => {
			state.status = 'failed';
			alert('Plan Load Failed!');
		},
		subscriptionLoadRequest: (state, action) => {
			state.status = 'loading';
		},
		subscriptionLoadSuccess: (state, action) => {
			state.status = 'success';
			state.subscriptions = action.payload;
			alert('Subscription Load Success!');
		},
		subscriptionLoadFailed: (state, action) => {
			state.status = 'failed';
			alert('Subscription Load Failed!');
		},
		subscriptionAddRequest: (state, action) => {
			state.status = 'loading';
		},
		subscriptionAddSuccess: (state, action) => {
			state.status = 'success';
			state.subscriptions.unshift(action.payload);
			alert('Subscription Create Success!');
		},
		subscriptionAddFailed: (state, action) => {
			state.status = 'failed';
			alert('Subscription Create Failed!');
		},
	},
});

const {
	planLoadRequest,
	planLoadSuccess,
	planLoadFailed,
	subscriptionAddRequest,
	subscriptionAddSuccess,
	subscriptionAddFailed,
	subscriptionLoadRequest,
	subscriptionLoadSuccess,
	subscriptionLoadFailed,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

//action creators

export const getInstitutionPlans = () =>
	apiCallBegan({
		url: '/subscription/institution',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: planLoadRequest.type,
		onSuccess: planLoadSuccess.type,
		onError: planLoadFailed.type,
	});
export const getClassroomPlans = () =>
	apiCallBegan({
		url: '/subscription/classroom',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: planLoadRequest.type,
		onSuccess: planLoadSuccess.type,
		onError: planLoadFailed.type,
	});
export const buyPlan = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formData,
		onStart: subscriptionAddRequest.type,
		onSuccess: subscriptionAddSuccess.type,
		onError: subscriptionAddFailed.type,
	});
export const getMySubscriptions = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: subscriptionLoadRequest.type,
		onSuccess: subscriptionLoadSuccess.type,
		onError: subscriptionLoadFailed.type,
	});
