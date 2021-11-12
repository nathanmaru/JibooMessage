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
		workspace: [],
		isLoading: false,
	},
	reducers: {
		workspaceLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		workspaceLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.workspace = action.payload;
		},
		workspaceLoadFailed: (state, action) => {},
		currentWorkspaceLoadRequest: (state, action) => {},
		currentWorkspaceLoadSuccess: (state, action) => {
			state.currentWorkspace = action.payload;
		},
		currentWorkspaceLoadFailed: (state, action) => {},
		workspaceAddRequest: (state, action) => {},
		workspaceAddSuccess: (state, action) => {
			state.workspace.unshift({
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.description,
			});
		},
		workspaceAddFailed: (state, action) => {
			alert('Adding Failed');
		},

		worksUpdateRequest: (state, action) => {
			toastId = toast.loading('Saving Changes...');
		},
		worksUpdateSuccess: (state, action) => {
			toast.update(toastId, {
				render: 'Workspace Updated!',
				type: 'success',
				autoClose: 1000,
				isLoading: false,
			});
			state.currentWorkspace = action.payload;
		},
		worksUpdateFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Workspace Updated Failed!',
				type: 'error',
				autoClose: 1000,
				isLoading: false,
			});
		},
		worksDeleteRequest: (state, action) => {
			toastId = toast.loading('Saving Changes...');
		},
		worksDeleteSuccess: (state, action) => {
			toast.update(toastId, {
				render: 'Workspace Deleted!',
				type: 'success',
				autoClose: 1000,
				isLoading: false,
			});
			state.currentWorkspace = null;
			window.location.href = '/works';
		},
		worksDeleteFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Workspace Deleted Failed!',
				type: 'error',
				autoClose: 1000,
				isLoading: false,
			});
		},

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

export const getMyWorkspaces = () =>
	apiCallBegan({
		url: '/workspace/my-list',
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
		url: '/workspace/' + id,
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
export const createWorkspace = (name, description, owner) =>
	apiCallBegan({
		url: '/workspace/create',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, description, owner },
		type: 'regular',
		onStart: workspaceAddRequest.type,
		onSuccess: workspaceAddSuccess.type,
		onError: workspaceAddFailed.type,
	});
export const updateWorkspace = (name, description, status, id) =>
	apiCallBegan({
		url: '/workspace/' + id,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, description, status },
		type: 'regular',
		onStart: worksUpdateRequest.type,
		onSuccess: worksUpdateSuccess.type,
		onError: worksUpdateFailed.type,
	});
export const deleteWorkspace = (id) =>
	apiCallBegan({
		url: '/workspace/' + id,
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
