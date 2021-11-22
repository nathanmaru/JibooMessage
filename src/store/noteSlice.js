import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const noteSlice = createSlice({
	name: 'notes',
	initialState: {
		currentNotes: null,
		notes: [],
		isLoading: false,
	},
	reducers: {
		noteLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		noteLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.notes = action.payload;
		},
		noteLoadFailed: (state, action) => {
			state.isLoading = false;
			state.notes = []; 
			alert('Notes Load Failed!');
		},
		noteAddRequest: (state, action) => {
			state.isLoading = true;
		},
		noteAddSuccess: (state, action) => {
			state.isLoading = false;
			state.notes.unshift(action.payload);
			alert('Notes Create Success!');
		},
		noteAddFailed: (state, action) => {
			state.isLoading = false;
			alert('Notes Create Failed!');
		},
		noteUpdateRequest: (state, action) => {
			state.isLoading = true;
		},
		noteUpdateSuccess: (state, action) => {
			state.isLoading = false;
			alert('Notes Update Success!');
		},
		noteUpdateFailed: (state, action) => {
			state.isLoading = false;
			alert('Notes Update Failed!');
		},
		noteDeleteRequest: (state, action) => {
			state.isLoading = true;
		},
		noteDeleteSuccess: (state, action) => {
			state.isLoading = false;
			alert('Delete note success please refresh the page');
		},
		noteDeleteFailed: (state, action) => {
			state.isLoading = false;
			alert('Delete Note Failed!');
		},
	},
});

const {
	noteLoadRequest,
	noteLoadSuccess,
	noteLoadFailed,
	noteUpdateRequest,
	noteUpdateSuccess,
	noteUpdateFailed,
	noteAddRequest,
	noteAddSuccess,
	noteAddFailed,
	noteDeleteRequest,
	noteDeleteSuccess,
	noteDeleteFailed,
} = noteSlice.actions;

export default noteSlice.reducer;

//action creators

export const getNotes = () =>
	apiCallBegan({
		url: '/note/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: noteLoadRequest.type,
		onSuccess: noteLoadSuccess.type,
		onError: noteLoadFailed.type,
	});
export const createNotes = (title, content, owner) =>
	apiCallBegan({
		url: '/note/',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: { title, content, owner },
		onStart: noteAddRequest.type,
		onSuccess: noteAddSuccess.type,
		onError: noteAddFailed.type,
	});
export const updateNote = (title, content, owner, id) =>
	apiCallBegan({
		url: '/note/' + id,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: { title, content, owner },
		onStart: noteUpdateRequest.type,
		onSuccess: noteUpdateSuccess.type,
		onError: noteUpdateFailed.type,
	});
export const deleteNote = (id) =>
	apiCallBegan({
		url: '/note/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',

		onStart: noteDeleteRequest.type,
		onSuccess: noteDeleteSuccess.type,
		onError: noteDeleteFailed.type,
	});
