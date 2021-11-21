import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const newResourceSlice = createSlice({
	name: 'newResource',
	initialState: {
		currentResource: null,
		resources: [],
		status: 'idle',
	},
	reducers: {
		loadResourcesRequest: (state, action) => {
			state.status = 'loading';
		},
		loadResourcesSuccess: (state, action) => {
			state.status = 'Resources Load success';
			state.resources = action.payload;
		},
		loadResourcesFailed: (state, action) => {
			state.status = 'Resources Load failed';
			alert('Resources load failed');
		},
		retrieveResourcesRequest: (state, action) => {
			state.status = 'loading';
		},
		retrieveResourcesSuccess: (state, action) => {
			state.status = 'Resources Retrieve success';
			state.currentResource = action.payload;
		},
		retrieveResourcesFailed: (state, action) => {
			state.status = 'Resources Retrieve failed';
			alert('Resources Retrieve failed');
		},
		addResourcesRequest: (state, action) => {
			state.status = 'loading';
		},
		addResourcesSuccess: (state, action) => {
			state.status = 'Resources Create success';
			state.resources.unshift(action.payload);
		},
		addResourcesFailed: (state, action) => {
			state.status = 'Resources Create failed';
			alert('Resources Create failed');
		},
		editResourcesRequest: (state, action) => {
			state.status = 'loading';
		},
		editResourcesSuccess: (state, action) => {
			state.status = 'Resources Edit success';
			state.currentResource = action.payload;
		},
		editResourcesFailed: (state, action) => {
			state.status = 'Resources Edit failed';
			alert('Resources Edit failed');
		},
		deleteResourcesRequest: (state, action) => {
			state.status = 'loading';
		},
		deleteResourcesSuccess: (state, action) => {
			state.status = 'Resources Delete success';
			state.currentResource = null;
		},
		deleteResourcesFailed: (state, action) => {
			state.status = 'Resources Delete failed';
			alert('Resources Delete failed');
		},
	},
});

const {
	loadResourcesRequest,
	loadResourcesSuccess,
	loadResourcesFailed,
	addResourcesRequest,
	addResourcesSuccess,
	addResourcesFailed,
	retrieveResourcesRequest,
	retrieveResourcesSuccess,
	retrieveResourcesFailed,
	editResourcesRequest,
	editResourcesSuccess,
	editResourcesFailed,
	deleteResourcesRequest,
	deleteResourcesSuccess,
	deleteResourcesFailed,
} = newResourceSlice.actions;

export default newResourceSlice.reducer;

//action creators

export const getResources = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadResourcesRequest.type,
		onSuccess: loadResourcesSuccess.type,
		onError: loadResourcesFailed.type,
	});

export const addResource = (link, name, description) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, description },
		type: 'regular',
		onStart: addResourcesRequest.type,
		onSuccess: addResourcesSuccess.type,
		onError: addResourcesFailed.type,
	});
export const retrieveResource = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},

		type: 'regular',
		onStart: retrieveResourcesRequest.type,
		onSuccess: retrieveResourcesSuccess.type,
		onError: retrieveResourcesFailed.type,
	});
export const editResource = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formData,
		type: 'regular',
		onStart: editResourcesRequest.type,
		onSuccess: editResourcesSuccess.type,
		onError: editResourcesFailed.type,
	});
export const deleteResource = (link) =>
	apiCallBegan({
		url: link,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},

		type: 'regular',
		onStart: deleteResourcesRequest.type,
		onSuccess: deleteResourcesSuccess.type,
		onError: deleteResourcesFailed.type,
	});
