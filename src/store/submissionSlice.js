import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const submissionSlice = createSlice({
	name: 'submission',
	initialState: {
		currentSubmission: null,
		submissions: [],
		status: 'idle',
	},
	reducers: {
		loadSubmissionRequest: (state, action) => {
			state.status = 'loading';
		},
		loadSubmissionSuccess: (state, action) => {
			state.status = 'submission load success';
			state.submissions = action.payload;
		},
		loadSubmissionFailed: (state, action) => {
			state.status = 'submission load failed';
			state.submissions = [];
		},
		addSubmissionRequest: (state, action) => {
			state.status = 'loading';
		},
		addSubmissionSuccess: (state, action) => {
			state.status = 'submission add success';
			state.submissions.unshift(action.payload);
		},
		addSubmissionFailed: (state, action) => {
			state.status = 'submission add failed';
			alert('Adding submission failed');
		},
		editSubmissionRequest: (state, action) => {
			state.status = 'loading';
		},
		editSubmissionSuccess: (state, action) => {
			const index = state.submissions.findIndex((item) => item.id === action.payload.id);
			state.submissions[index] = action.payload;
			state.status = 'submission edit success';
		},
		editSubmissionFailed: (state, action) => {
			state.status = 'submission edit failed';
			alert('Editing submission failed');
		},
		deleteSubmissionRequest: (state, action) => {
			state.status = 'loading';
		},
		deleteSubmissionSuccess: (state, action) => {
			const filtered = state.submissions.filter((item) => item.id !== action.payload.id);
			state.submissions = filtered;
			state.status = 'submission delete success';
		},
		deleteSubmissionFailed: (state, action) => {
			state.status = 'submission delete failed';
			alert('Delete submission failed');
		},
		retrieveSubmissionRequest: (state, action) => {
			state.status = 'loading';
		},
		retrieveSubmissionSuccess: (state, action) => {
			state.currentSubmission = action.payload;
			state.status = 'submission retrieve success';
		},
		retrieveSubmissionFailed: (state, action) => {
			state.status = 'submission retrieve failed';
			alert('retrieve submission failed');
		},
	},
});

const {
	loadSubmissionRequest,
	loadSubmissionSuccess,
	loadSubmissionFailed,
	addSubmissionRequest,
	addSubmissionSuccess,
	addSubmissionFailed,
	editSubmissionRequest,
	editSubmissionSuccess,
	editSubmissionFailed,
	deleteSubmissionRequest,
	deleteSubmissionSuccess,
	deleteSubmissionFailed,
	retrieveSubmissionRequest,
	retrieveSubmissionSuccess,
	retrieveSubmissionFailed,
} = submissionSlice.actions;

export default submissionSlice.reducer;

//action creators

export const createSubmission = (workspace, formData) =>
	apiCallBegan({
		url: '/submission/workspace/' + workspace,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formData,
		onStart: addSubmissionRequest.type,
		onSuccess: addSubmissionSuccess.type,
		onError: addSubmissionFailed.type,
	});

export const getSubmissions = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadSubmissionRequest.type,
		onSuccess: loadSubmissionSuccess.type,
		onError: loadSubmissionFailed.type,
	});
export const editSubmission = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formData,
		type: 'regular',
		onStart: editSubmissionRequest.type,
		onSuccess: editSubmissionSuccess.type,
		onError: editSubmissionFailed.type,
	});
export const deleteSubmission = (link) =>
	apiCallBegan({
		url: link,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: deleteSubmissionRequest.type,
		onSuccess: deleteSubmissionSuccess.type,
		onError: deleteSubmissionFailed.type,
	});
export const retrieveSubmission = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: retrieveSubmissionRequest.type,
		onSuccess: retrieveSubmissionSuccess.type,
		onError: retrieveSubmissionFailed.type,
	});

export const selectSubmission = (submission) => retrieveSubmissionSuccess(submission);
