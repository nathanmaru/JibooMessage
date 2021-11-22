import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId2;
let toastId;

export const workspaceSlice = createSlice({
	name: 'works',
	initialState: {
		currentWorkspace: null,
		workspaces: [],
		status: 'idle',
	},
	reducers: {
		workspaceLoadRequest: (state, action) => {
			state.status = 'loading';
		},
		workspaceLoadSuccess: (state, action) => {
			state.status = 'workspace load success';
			state.workspaces = action.payload;
		},
		workspaceLoadFailed: (state, action) => {
			state.status = 'workspace load failed';
		},
		currentWorkspaceLoadRequest: (state, action) => {},
		currentWorkspaceLoadSuccess: (state, action) => {
			state.currentWorkspace = action.payload;
		},
		currentWorkspaceLoadFailed: (state, action) => {},
		workspaceAddRequest: (state, action) => {},
		workspaceAddSuccess: (state, action) => {
			state.workspaces.unshift(action.payload);
			state.currentWorkspace = action.payload;
		},
		workspaceAddFailed: (state, action) => {
			alert('Adding Failed');
		},

		worksUpdateRequest: (state, action) => {},
		worksUpdateSuccess: (state, action) => {
			state.currentWorkspace = action.payload;
		},
		worksUpdateFailed: (state, action) => {
			alert('Failed');
		},
		worksDeleteRequest: (state, action) => {},
		worksDeleteSuccess: (state, action) => {
			state.currentWorkspace = null;
		},
		worksDeleteFailed: (state, action) => {},

		worksDeleted: (state, action) => {},
	},
});

const {
	workspaceLoadRequest,
	workspaceLoadSuccess,
	workspaceLoadFailed,
	currentWorkspaceLoadRequest,
	currentWorkspaceLoadSuccess,
	currentWorkspaceLoadFailed,
	worksRequestFinished,
	workspaceAddRequest,
	workspaceAddSuccess,
	workspaceAddFailed,
	worksUpdateRequest,
	worksUpdateSuccess,
	worksUpdateFailed,
	worksDeleteRequest,
	worksDeleteSuccess,
	worksDeleteFailed,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;

//action creators

export const getWorkspaces = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: workspaceLoadRequest.type,
		onSuccess: workspaceLoadSuccess.type,
		onError: workspaceLoadFailed.type,
	});
export const getCurrentWorkspace = (id) =>
	apiCallBegan({
		url: '/workspace/change/' + id,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: currentWorkspaceLoadRequest.type,
		onSuccess: currentWorkspaceLoadSuccess.type,
		onError: currentWorkspaceLoadFailed.type,
	});
export const createWorkspace = (classroom, formdata) =>
	apiCallBegan({
		url: '/workspace/' + classroom,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: workspaceAddRequest.type,
		onSuccess: workspaceAddSuccess.type,
		onError: workspaceAddFailed.type,
	});
export const updateWorkspace = (id, formdata) =>
	apiCallBegan({
		url: '/workspace/change/' + id,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: worksUpdateRequest.type,
		onSuccess: worksUpdateSuccess.type,
		onError: worksUpdateFailed.type,
	});
export const deleteWorkspace = (id) =>
	apiCallBegan({
		url: '/workspace/change/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},

		type: 'regular',
		onStart: worksDeleteRequest.type,
		onSuccess: worksDeleteSuccess.type,
		onError: worksDeleteFailed.type,
	});
