import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const classroomMemberSlice = createSlice({
	name: 'works',
	initialState: {
		currentMember: null,
		members: [],
		classroom: null,
		isLoading: false,
	},
	reducers: {
		memberListLoadRequest: (state, action) => {
			toastId = toast.loading('Loading Members...');
		},
		memberListLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.members = action.payload; 
		},
		memberListLoadFailed: (state, action) => {},
		findClassroomRequest: (state, action) => {
			state.classroom = null;
			alert('Members Load Failed!');
		},
		findClassroomSucess: (state, action) => {
			state.classroom = action.payload;
			alert('Classroom Found Success!');
		},
		findClassroomFailed: (state, action) => {
			alert('No class found with code provided');
		},
		joinClassroomRequest: (state, action) => {
			state.classroom = null;
		},
		joinClassroomSucess: (state, action) => {
			window.location.href = `classroom/researcher/${action.payload.classroom}?classroom=${action.payload.classroom}`;
			alert('Classroom Joined Success!');
		},
		joinClassroomFailed: (state, action) => {
			alert('No class found with code provided');
		},
	},
});

const {
	memberListLoadRequest,
	memberListLoadSuccess,
	memberListLoadFailed,
	findClassroomRequest,
	findClassroomSucess,
	findClassroomFailed,
	joinClassroomRequest,
	joinClassroomSucess,
	joinClassroomFailed,
} = classroomMemberSlice.actions;

export default classroomMemberSlice.reducer;

//action creators

export const getMembers = (classroom) =>
	apiCallBegan({
		url: '/classroom/members/' + classroom,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: memberListLoadRequest.type,
		onSuccess: memberListLoadSuccess.type,
		onError: memberListLoadFailed.type,
	});
export const findClassroom = (
	code //outdated?
) =>
	apiCallBegan({
		url: '/classroom/find/' + code,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: findClassroomRequest.type,
		onSuccess: findClassroomSucess.type,
		onError: findClassroomFailed.type,
	});
export const joinClassroom = (classroom, student, status) =>
	apiCallBegan({
		url: '/classroom/join/',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: { classroom, student, status },
		onStart: joinClassroomRequest.type,
		onSuccess: joinClassroomSucess.type,
		onError: joinClassroomFailed.type,
	});
