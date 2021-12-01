import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const folderSlice = createSlice({
	name: 'folder',
	initialState: {
		currentFolder: null,
		folders: [],
		status: 'idle',
	},
	reducers: {
		loadFolderRequest: (state, action) => {
			state.status = 'loading';
		},
		loadFolderSuccess: (state, action) => {
			state.status = 'Folder load success';
			state.folders = action.payload;
		},
		loadFolderFailed: (state, action) => {
			alert('Folders Load Failed!');
		},
		retrieveFolderRequest: (state, action) => {
			state.status = 'loading';
		},
		retrieveFolderSuccess: (state, action) => {
			state.status = 'Folder retrieve success';
			state.currentFolder = action.payload;
		},
		retrieveFolderFailed: (state, action) => {
			alert('Folders Retrieve Failed!');
		},
		addFolderRequest: (state, action) => {
			state.status = 'loading';
		},
		addFolderSuccess: (state, action) => {
			state.status = 'Folder add success';
			state.folders.push(action.payload);
			alert('Folders Add Success!');
		},
		addFolderFailed: (state, action) => {
			state.status = 'Folder add failed';
			alert('Folders Add Failed!');
		},
		editFolderRequest: (state, action) => {
			state.status = 'loading';
		},
		editFolderSuccess: (state, action) => {
			const index = state.folders.findIndex((item) => item.id === action.payload.id);
			state.folders[index] = action.payload;
			state.status = 'Folder edit success';
			alert('Folders Edit Success!');
		},
		editFolderFailed: (state, action) => {
			state.status = 'Folder edit failed';
			alert('Folders Add Failed!');
		},
		deleteFolderRequest: (state, action) => {
			state.status = 'loading';
		},
		deleteFolderSuccess: (state, action) => {
			console.log(action.payload);
			const filtered = state.folders.filter((item) => item.id !== action.payload.id);
			console.log(filtered);
			state.folders = filtered;
			state.status = 'Folder delete success';
			alert('Folders Delete Success!');
		},
		deleteFolderFailed: (state, action) => {
			state.status = 'Folder delete failed';
			alert('Folders delete failed');
		},
	},
});

const {
	loadFolderRequest,
	loadFolderSuccess,
	loadFolderFailed,
	addFolderRequest,
	addFolderSuccess,
	addFolderFailed,
	editFolderRequest,
	editFolderSuccess,
	editFolderFailed,
	retrieveFolderRequest,
	retrieveFolderSuccess,
	retrieveFolderFailed,
	deleteFolderRequest,
	deleteFolderSuccess,
	deleteFolderFailed,
} = folderSlice.actions;

export default folderSlice.reducer;

//action creators

export const getFolders = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadFolderRequest.type,
		onSuccess: loadFolderSuccess.type,
		onError: loadFolderFailed.type,
	});
export const addFolder = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formdata,
		onStart: addFolderRequest.type,
		onSuccess: addFolderSuccess.type,
		onError: addFolderFailed.type,
	});
export const retrieveFolder = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',

		onStart: retrieveFolderRequest.type,
		onSuccess: retrieveFolderSuccess.type,
		onError: retrieveFolderFailed.type,
	});
export const editFolder = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formData,
		onStart: editFolderRequest.type,
		onSuccess: editFolderSuccess.type,
		onError: editFolderFailed.type,
	});
export const deleteFolder = (link) =>
	apiCallBegan({
		url: link,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: deleteFolderRequest.type,
		onSuccess: deleteFolderSuccess.type,
		onError: deleteFolderFailed.type,
	});
