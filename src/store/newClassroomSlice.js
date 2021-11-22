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
			alert('Classroom Load Failed!');
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
			alert('Current Classroom Load Failed!');
		},

		createClassroomLoadRequest: (state, action) => {
			state.status = 'Classroom add loading';
		},

		createClassroomSuccess: (state, action) => {
			state.classes.unshift(action.payload);
			state.currentClassroom = action.payload;
			state.status = 'Classroom add success';
			alert('Classroom Create Success!');
		},
		createClassroomFailed: (state, action) => {
			state.status = 'Classroom add failed';
			alert('Classroom Create Failed!');
		},

		classroomEditRequest: (state, action) => {
			state.status = 'Classroom edit loading';
		},
		classroomEditSuccess: (state, action) => {
			const index = state.classes.findIndex((item) => item.id === action.payload.id);
			state.classes[index] = action.payload;
			state.status = 'Classroom edit success';
			alert('Classroom Edit Success!');
		},
		classroomEditFailed: (state, action) => {
			state.status = 'Classroom edit failed';
			alert('Classroom Edit Failed!');
		},
		deleteClassroomRequest: (state, action) => {
			state.status = 'Classroom delete loading';
		},
		deleteClassroomSuccess: (state, action) => {
			const filtered = state.classes.filter((val) => val.id != action.payload.id);
			state.classes = filtered;
			state.status = 'Classroom delete success';
			alert('Classroom Delete Success!');
		},
		deleteClassroomFailed: (state, action) => {
			state.status = 'Classroom delete failed';
			alert('Classroom Delete Failed!');
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
	deleteClassroomRequest,
	deleteClassroomSuccess,
	deleteClassroomFailed,
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
export const deleteAdviserClassroom = (classroom) =>
	apiCallBegan({
		url: '/classroom/' + classroom,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: deleteClassroomRequest.type,
		onSuccess: deleteClassroomSuccess.type,
		onError: deleteClassroomFailed.type,
	});

export const getCurrentClassroom = (classroom) =>
	apiCallBegan({
		url: '/classroom/' + classroom,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadCurrentClassroomRequest.type,
		onSuccess: loadCurrentClassroomSuccess.type,
		onError: loadCurrentClassroomFailed.type,
	});

export const getStudentClassroom = () =>
	apiCallBegan({
		url: '/classroom/my-class',
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

export const joinClassroom = (classroom) =>
	apiCallBegan({
		url: '/classroom/join',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { classroom },
		type: 'regular',
		onStart: createClassroomLoadRequest.type,
		onSuccess: createClassroomSuccess.type,
		onError: createClassroomFailed.type,
	});
