import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const newClassroomSlice = createSlice({
	name: 'newClassroom',
	initialState: {
		currentClassroom: null,
		classes: [],
		status: 'idle',
	},
	reducers: {
		loadClassroomRequest: (state, action) => {
			state.status = 'Classroom loading';
		},

		loadClassroomSuccess: (state, action) => {
			state.classes = action.payload;
			state.status = 'Classroom load success';
		},
		loadClassroomFailed: (state, action) => {
			state.classes = null;
			state.status = 'Classroom load failed';
		},

		loadCurrentClassroomRequest: (state, action) => {
			state.status = 'Classroom loading';
		},

		loadCurrentClassroomSuccess: (state, action) => {
			state.currentClassroom = action.payload;
			state.status = 'Classroom load success';
		},
		loadCurrentClassroomFailed: (state, action) => {
			state.status = 'Classroom load failed';
		},

		createClassroomLoadRequest: (state, action) => {
			state.status = 'Classroom add loading';
		},

		createClassroomSuccess: (state, action) => {
			state.classes.unshift(action.payload);
			state.currentClassroom = action.payload;
			state.status = 'Classroom add success';
		},
		createClassroomFailed: (state, action) => {
			state.status = 'Classroom add failed';
		},

		classroomEditRequest: (state, action) => {
			state.status = 'Classroom edit loading';
		},
		classroomEditSuccess: (state, action) => {
			const index = state.classes.findIndex((item) => item.id === action.payload.id);
			state.classes[index] = action.payload;
			state.status = 'Classroom edit success';
		},
		classroomEditFailed: (state, action) => {
			state.status = 'Classroom edit failed';
		},
	},
});

const {
	loadClassroomRequest,
	loadClassroomSuccess,
	loadClassroomFailed,
	createClassroomLoadRequest,
	createClassroomSuccess,
	createClassroomFailed,
	loadCurrentClassroomRequest,
	loadCurrentClassroomSuccess,
	loadCurrentClassroomFailed,
	classroomEditRequest,
	classroomEditSuccess,
	classroomEditFailed,
} = newClassroomSlice.actions;

export default newClassroomSlice.reducer;

export const getAdviserClassroom = () =>
	apiCallBegan({
		url: '/classroom/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadClassroomRequest.type,
		onSuccess: loadClassroomSuccess.type,
		onError: loadClassroomFailed.type,
	});
export const addAdviserClassroom = (form_data) =>
	apiCallBegan({
		url: '/classroom/',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: form_data,
		type: 'regular',
		onStart: createClassroomLoadRequest.type,
		onSuccess: createClassroomSuccess.type,
		onError: createClassroomFailed.type,
	});
export const editAdviserClassroom = (classroom, form_data) =>
	apiCallBegan({
		url: '/classroom/' + classroom,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: form_data,
		type: 'regular',
		onStart: classroomEditRequest.type,
		onSuccess: classroomEditSuccess.type,
		onError: classroomEditFailed.type,
	});
