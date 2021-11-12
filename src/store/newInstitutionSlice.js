import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const institutionSlice = createSlice({
	name: 'institution',
	initialState: {
		currentInstitution: null,
		verification: null,
		institutions: [],
		status: 'idle',
	},
	reducers: {
		institutionLoadRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionLoadSuccess: (state, action) => {
			state.status = 'success';
			state.institutions = action.payload;
		},
		institutionLoadFailed: (state, action) => {
			state.status = 'failed';
		},
		institutionCreateRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionCreateSuccess: (state, action) => {
			state.status = 'success';
			state.institutions.unshift(action.payload);
		},
		institutionCreateFailed: (state, action) => {
			state.status = 'failed';
		},
		institutionRetrieveRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionRetrieveSuccess: (state, action) => {
			state.status = 'success';
			state.currentInstitution = action.payload;
		},
		institutionRetrieveFailed: (state, action) => {
			state.status = 'failed';
			alert('action Failed');
		},
		// verification
		verificationApplyRequest: (state, action) => {
			state.status = 'loading';
		},
		verificationApplySuccess: (state, action) => {
			state.status = 'success';
			state.verification = action.payload;
		},
		verificationApplyFailed: (state, action) => {
			state.status = 'failed';
			alert('action Failed');
		},
		verificationEditRequest: (state, action) => {
			state.status = 'loading';
		},
		verificationEditSuccess: (state, action) => {
			state.status = 'success';
			state.verification = action.payload;
		},
		verificationEditFailed: (state, action) => {
			state.status = 'failed';
			alert('action Failed');
		},
		verificationCheckRequest: (state, action) => {
			state.status = 'loading';
		},
		verificationCheckSuccess: (state, action) => {
			state.status = 'success';
			state.verification = action.payload;
		},
		verificationCheckFailed: (state, action) => {
			state.status = 'failed';
			alert('action Failed');
		},
	},
});

const {
	institutionLoadRequest,
	institutionLoadSuccess,
	institutionLoadFailed,
	institutionCreateRequest,
	institutionCreateSuccess,
	institutionCreateFailed,
	institutionRetrieveRequest,
	institutionRetrieveSuccess,
	institutionRetrieveFailed,
	verificationApplyRequest,
	verificationApplySuccess,
	verificationApplyFailed,
	verificationEditRequest,
	verificationEditSuccess,
	verificationEditFailed,
	verificationCheckRequest,
	verificationCheckSuccess,
	verificationCheckFailed,
} = institutionSlice.actions;

export default institutionSlice.reducer;

//action creators

export const getMyInstitutions = () =>
	apiCallBegan({
		url: '/institution/list',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: institutionLoadRequest.type,
		onSuccess: institutionLoadSuccess.type,
		onError: institutionLoadFailed.type,
	});
export const createInstitution = (name) =>
	apiCallBegan({
		url: '/institution/create',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name },
		type: 'regular',
		onStart: institutionCreateRequest.type,
		onSuccess: institutionCreateSuccess.type,
		onError: institutionCreateFailed.type,
	});
export const retrieveInstitution = (id) =>
	apiCallBegan({
		url: '/institution/' + id,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: institutionRetrieveRequest.type,
		onSuccess: institutionRetrieveSuccess.type,
		onError: institutionRetrieveFailed.type,
	});
export const editInstitution = (id, form_data) =>
	apiCallBegan({
		url: '/institution/' + id,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: form_data,
		type: 'regular',
		onStart: institutionRetrieveRequest.type,
		onSuccess: institutionRetrieveSuccess.type,
		onError: institutionRetrieveFailed.type,
	});

// Verification

export const applyVerification = (form_data) =>
	apiCallBegan({
		url: '/institution/verify',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		data: form_data,
		type: 'regular',
		onStart: verificationApplyRequest.type,
		onSuccess: verificationApplySuccess.type,
		onError: verificationApplyFailed.type,
	});
export const editVerification = (institution, document) =>
	apiCallBegan({
		url: '/institution/verify/' + institution,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { document },
		type: 'regular',
		onStart: verificationEditRequest.type,
		onSuccess: verificationEditSuccess.type,
		onError: verificationEditFailed.type,
	});
export const checkVerification = (institution) =>
	apiCallBegan({
		url: '/institution/verify/' + institution,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: verificationCheckRequest.type,
		onSuccess: verificationCheckSuccess.type,
		onError: verificationCheckFailed.type,
	});

// //subscription
// export const buyPlan = (institution, plan, payerName, payerEmail) =>
// apiCallBegan({
// 	url: '/institution/subscribe',
// 	method: 'post',
// 	headers: {
// 		Authorization: 'Bearer ' + localStorage.getItem('access_token'),
// 		'Content-Type': 'application/json',
// 		accept: 'application/json',
// 	},
// 	type: 'regular',
// 	data: {institution, plan, payerName, payerEmail},
// 	onStart: verificationCheckRequest.type,
// 	onSuccess: verificationCheckSuccess.type,
// 	onError: verificationCheckFailed.type,
// });
