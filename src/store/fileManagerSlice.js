import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const fileManagerSlice = createSlice({
	name: 'fileManager',
	initialState: {
		folders: [],
		uploadedFiles: [],
		quillFiles: [],
		currentQuillFile: null,
		isLoading: false,
	},
	reducers: {
		// folder CRUD
		folderLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		folderLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.folders = action.payload;
		},
		folderLoadFailed: (state, action) => {
			console.log(action.error);
			alert('Folders Load Failed');
		},
		folderCreateRequest: (state, action) => {
			state.isLoading = true;
		},
		folderCreateSuccess: (state, action) => {
			state.isLoading = false;
			state.folders.push(action.payload);
		},
		folderCreateFailed: (state, action) => {
			console.log(action.error);
			alert('Folders Create Failed');
		},
		folderEditRequest: (state, action) => {
			state.isLoading = true;
		},
		folderEditSuccess: (state, action) => {
			state.isLoading = false;
			const index = state.folders.findIndex((val) => val.id == action.payload.id);
			state.folders[index] = action.payload;
		},
		folderEditFailed: (state, action) => {
			console.log(action.error);
			alert('Folders Edit Failed');
		},
		folderDeleteRequest: (state, action) => {
			state.isLoading = true;
		},
		folderDeleteSuccess: (state, action) => {
			state.isLoading = false;
			const filtered = state.folders.filter((val) => val.id !== action.payload.id);
			state.folders = filtered;
		},
		folderDeleteFailed: (state, action) => {
			console.log(action.error);
			alert('Folders Delete Failed');
		},
		// uploaded files CRUD
		uploadFileLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		uploadFileLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.uploadedFiles = action.payload;
		},
		uploadFileLoadFailed: (state, action) => {
			console.log(action.error);
			alert('Files load Failed');
		},
		uploadFileCreateRequest: (state, action) => {
			state.isLoading = true;
		},
		uploadFileCreateSuccess: (state, action) => {
			state.isLoading = false;
			state.uploadedFiles.push(action.payload);
		},
		uploadFileCreateFailed: (state, action) => {
			console.log(action.error);
			alert('File Upload Failed');
		},
		uploadFileDeleteRequest: (state, action) => {
			state.isLoading = true;
		},
		uploadFileDeleteSuccess: (state, action) => {
			state.isLoading = false;
			const filtered = state.uploadedFiles.filter((val) => val.id !== action.payload.id);
			state.uploadedFiles = filtered;
		},
		uploadFileDeleteFailed: (state, action) => {
			console.log(action.error);
			alert('File Upload Failed');
		},

		// quill files
		quillFileLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		quillFileLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.quillFiles = action.payload;
		},
		quillFileLoadFailed: (state, action) => {
			console.log(action.error);
			alert('Files load Failed');
		},
		quillFileRetrieveRequest: (state, action) => {
			state.isLoading = true;
		},
		quillFileRetrieveSuccess: (state, action) => {
			state.isLoading = false;
			state.currentQuillFile = action.payload;
		},
		quillFileRetrieveFailed: (state, action) => {
			console.log(action.error);
			alert('Files load Failed');
		},
		quillFileCreateRequest: (state, action) => {
			state.isLoading = true;
		},
		quillFileCreateSuccess: (state, action) => {
			state.isLoading = false;
			state.quillFiles.push(action.payload);
		},
		quillFileCreateFailed: (state, action) => {
			console.log(action.error);
			alert('File Create Failed');
		},
		quillFileDeleteRequest: (state, action) => {
			state.isLoading = true;
		},
		quillFileDeleteSuccess: (state, action) => {
			state.isLoading = false;
			const filtered = state.quillFiles.filter((val) => val.id !== action.payload.id);
			state.quillFiles = filtered;
		},
		quillFileDeleteFailed: (state, action) => {
			console.log(action.error);
			alert('File Upload Failed');
		},
	},
});

const {
	// folder
	folderLoadRequest,
	folderLoadSuccess,
	folderLoadFailed,
	folderCreateRequest,
	folderCreateSuccess,
	folderCreateFailed,
	folderEditRequest,
	folderEditSuccess,
	folderEditFailed,
	folderDeleteRequest,
	folderDeleteSuccess,
	folderDeleteFailed,
	// uploaded files
	uploadFileLoadRequest,
	uploadFileLoadSuccess,
	uploadFileLoadFailed,
	uploadFileCreateRequest,
	uploadFileCreateSuccess,
	uploadFileCreateFailed,
	uploadFileDeleteRequest,
	uploadFileDeleteSuccess,
	uploadFileDeleteFailed,
	// quill files
	quillFileLoadRequest,
	quillFileLoadSuccess,
	quillFileLoadFailed,
	quillFileCreateRequest,
	quillFileCreateSuccess,
	quillFileCreateFailed,
	quillFileDeleteRequest,
	quillFileDeleteSuccess,
	quillFileDeleteFailed,
	quillFileRetrieveRequest,
	quillFileRetrieveSuccess,
	quillFileRetrieveFailed,
} = fileManagerSlice.actions;

export default fileManagerSlice.reducer;

//action creators

// files

export const loadWorkspaceFolders = (workspace) =>
	apiCallBegan({
		url: '/workspace/folder-list/' + workspace,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: folderLoadRequest.type,
		onSuccess: folderLoadSuccess.type,
		onError: folderLoadFailed.type,
	});
export const createWorkspaceFolder = (workspace, name) =>
	apiCallBegan({
		url: '/workspace/folder',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, workspace },
		type: 'regular',
		onStart: folderCreateRequest.type,
		onSuccess: folderCreateSuccess.type,
		onError: folderCreateFailed.type,
	});
export const editWorkspaceFolder = (id, name) =>
	apiCallBegan({
		url: '/workspace/folder/' + id,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name },
		type: 'regular',
		onStart: folderEditRequest.type,
		onSuccess: folderEditSuccess.type,
		onError: folderEditFailed.type,
	});
export const deleteWorkspaceFolder = (id) =>
	apiCallBegan({
		url: '/workspace/folder/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: folderDeleteRequest.type,
		onSuccess: folderDeleteSuccess.type,
		onError: folderDeleteFailed.type,
	});

// uploaded files
export const getUploadedFiles = (folder) =>
	apiCallBegan({
		url: '/workspace/upload-file-list/' + folder,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: uploadFileLoadRequest.type,
		onSuccess: uploadFileLoadSuccess.type,
		onError: uploadFileLoadFailed.type,
	});
export const uploadFile = (formData) =>
	apiCallBegan({
		url: '/workspace/upload-file',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		data: formData,
		type: 'regular',
		onStart: uploadFileCreateRequest.type,
		onSuccess: uploadFileCreateSuccess.type,
		onError: uploadFileCreateFailed.type,
	});
export const editUploadFile = (formData) =>
	apiCallBegan({
		url: '/workspace/upload-file',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		data: formData,
		type: 'regular',
		onStart: uploadFileCreateRequest.type,
		onSuccess: uploadFileCreateSuccess.type,
		onError: uploadFileCreateFailed.type,
	});
export const deleteUploadFile = (id) =>
	apiCallBegan({
		url: '/workspace/upload-file/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		type: 'regular',
		onStart: uploadFileDeleteRequest.type,
		onSuccess: uploadFileDeleteSuccess.type,
		onError: uploadFileDeleteFailed.type,
	});

// quill files

export const getQuillFiles = (folder) =>
	apiCallBegan({
		url: '/workspace/quill-file-list/' + folder,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: quillFileLoadRequest.type,
		onSuccess: quillFileLoadSuccess.type,
		onError: quillFileLoadFailed.type,
	});
export const createQuillFile = (name, folder) =>
	apiCallBegan({
		url: '/workspace/quill-file',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, folder },
		type: 'regular',
		onStart: quillFileCreateRequest.type,
		onSuccess: quillFileCreateSuccess.type,
		onError: quillFileCreateFailed.type,
	});
export const deleteQuillFile = (id) =>
	apiCallBegan({
		url: '/workspace/quill-file/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		type: 'regular',
		onStart: quillFileDeleteRequest.type,
		onSuccess: quillFileDeleteSuccess.type,
		onError: quillFileDeleteFailed.type,
	});
export const editQuillFile = (data, id) =>
	apiCallBegan({
		url: '/workspace/quill-file/' + id,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data,
		type: 'regular',
		onStart: quillFileDeleteRequest.type,
		onSuccess: quillFileDeleteSuccess.type,
		onError: quillFileDeleteFailed.type,
	});
export const retrieveQuillFile = (id) =>
	apiCallBegan({
		url: '/workspace/quill-file/' + id,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		type: 'regular',
		onStart: quillFileRetrieveRequest.type,
		onSuccess: quillFileRetrieveSuccess.type,
		onError: quillFileRetrieveFailed.type,
	});
