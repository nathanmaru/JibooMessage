import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const departmentSlice = createSlice({
	name: 'department',
	initialState: {
		currentDepartment: null,
		departments: [],
		status: 'idle',
	},
	reducers: {
		loadDepartementRequest: (state, action) => {
			state.status = 'loading';
		},
		loadDepartementSuccess: (state, action) => {
			state.status = 'Department load success';
			state.departments = action.payload;
		},
		loadDepartementFailed: (state, action) => {
			state.status = 'Department load failed';

			alert('Department Load Failed!');
		},
		retrieveDepartementRequest: (state, action) => {
			state.status = 'loading';
		},
		retrieveDepartementSuccess: (state, action) => {
			state.status = 'Department retrieve success';
			state.currentDepartment = action.payload;
		},
		retrieveDepartementFailed: (state, action) => {
			state.status = 'Department retrieve failed';
			alert('Department retrieve Failed!');
		},
		createDepartementRequest: (state, action) => {
			state.status = 'loading';
		},
		createDepartementSuccess: (state, action) => {
			state.status = 'Department create success';
			state.departments.unshift(action.payload);
			alert('Department create Success!');
		},
		createDepartementFailed: (state, action) => {
			state.status = 'Department create failed';
			alert('Department create Failed!');
		},
		editDepartementRequest: (state, action) => {
			state.status = 'loading';
		},
		editDepartementSuccess: (state, action) => {
			state.status = 'Department edit success';
			state.currentDepartment = action.payload;
		},
		editDepartementFailed: (state, action) => {
			state.status = 'Department edit failed';
			alert('Department edit Failed!');
		},
		deleteDepartementRequest: (state, action) => {
			state.status = 'loading';
		},
		deleteDepartementSuccess: (state, action) => {
			state.status = 'Department delete success';
			state.currentDepartment = null;
			const filtered = state.departments.filter((val) => val.id !== action.payload.id);
			state.departments = filtered;
			alert('Department delete success !');
		},
		deleteDepartementFailed: (state, action) => {
			state.status = 'Department delete failed';
			alert('Department delete Failed!');
		},
	},
});

const {
	loadDepartementRequest,
	loadDepartementSuccess,
	loadDepartementFailed,
	createDepartementRequest,
	createDepartementSuccess,
	createDepartementFailed,
	retrieveDepartementRequest,
	retrieveDepartementSuccess,
	retrieveDepartementFailed,
	editDepartementRequest,
	editDepartementSuccess,
	editDepartementFailed,
	deleteDepartementRequest,
	deleteDepartementSuccess,
	deleteDepartementFailed,
} = departmentSlice.actions;

export default departmentSlice.reducer;

//action creators

export const getDepartments = (institution) =>
	apiCallBegan({
		url: '/institution/department/' + institution,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadDepartementRequest.type,
		onSuccess: loadDepartementSuccess.type,
		onError: loadDepartementFailed.type,
	});
export const createDepartment = (institution, formdata) =>
	apiCallBegan({
		url: '/institution/department/' + institution,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formdata,
		onStart: createDepartementRequest.type,
		onSuccess: createDepartementSuccess.type,
		onError: createDepartementFailed.type,
	});
export const retrieveDepartment = (department) =>
	apiCallBegan({
		url: '/institution/department/change/' + department,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',

		onStart: retrieveDepartementRequest.type,
		onSuccess: retrieveDepartementSuccess.type,
		onError: retrieveDepartementFailed.type,
	});
export const editDepartment = (department, formdata) =>
	apiCallBegan({
		url: '/institution/department/change/' + department,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formdata,
		onStart: editDepartementRequest.type,
		onSuccess: editDepartementSuccess.type,
		onError: editDepartementFailed.type,
	});
export const deleteDepartment = (department) =>
	apiCallBegan({
		url: '/institution/department/change/' + department,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',

		onStart: deleteDepartementRequest.type,
		onSuccess: deleteDepartementSuccess.type,
		onError: deleteDepartementFailed.type,
	});
