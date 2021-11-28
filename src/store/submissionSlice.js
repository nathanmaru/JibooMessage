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
	},
});

const {
	loadSubmissionRequest,
	loadSubmissionSuccess,
	loadSubmissionFailed,
	addSubmissionRequest,
	addSubmissionSuccess,
	addSubmissionFailed,
} = submissionSlice.actions;

export default submissionSlice.reducer;

//action creators

export const createSubmission = (workspace, title, description, file) =>
	apiCallBegan({
		url: '/submission/workspace/' + workspace,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: { title, description, file },
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
