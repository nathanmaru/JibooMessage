import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const articleSlice = createSlice({
	name: 'article',
	initialState: {
		currentArticle: null,
		articles: [],
		isLoading: false,
	},
	reducers: {
		articleLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		articleLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.articles = action.payload;
		},
		articleLoadFailed: (state, action) => {
			alert('Articles load failed');
		},
		articleRetrieveRequest: (state, action) => {
			state.isLoading = true;
		},
		articleRetrieveSuccess: (state, action) => {
			state.isLoading = false;
			state.currentArticle = action.payload;
		},
		articleRetrieveFailed: (state, action) => {
			alert('Article load failed');
		},
	},
});

const {
	articleLoadRequest,
	articleLoadSuccess,
	articleLoadFailed,
	articleRetrieveRequest,
	articleRetrieveSuccess,
	articleRetrieveFailed,
} = articleSlice.actions;

export default articleSlice.reducer;

//action creators

export const getArticles = () =>
	apiCallBegan({
		url: '/article',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: articleLoadRequest.type,
		onSuccess: articleLoadSuccess.type,
		onError: articleLoadFailed.type,
	});
export const retrieveArticle = (id) =>
	apiCallBegan({
		url: '/article/' + id,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: articleRetrieveRequest.type,
		onSuccess: articleRetrieveSuccess.type,
		onError: articleRetrieveFailed.type,
	});
