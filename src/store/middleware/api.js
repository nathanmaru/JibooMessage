import axios from 'axios';
import * as actions from '../actions/api';
import axiosInstance from './axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== actions.apiCallBegan.type) return next(action);

		const { url, method, headers, data, onSuccess, onError, onStart, type } = action.payload;

		if (onStart) dispatch({ type: onStart });

		try {
			let response;
			if (type) {
				response = await axiosInstance.request({
					baseURL: process.env.REACT_APP_BACKEND_API_URL,
					url,
					headers,
					method,
					data,
				});
			} else {
				response = await axios.request({
					baseURL: process.env.REACT_APP_BACKEND_API_URL,
					url,
					headers,
					method,
					data,
				});
			}

			//general
			// dispatch(actions.apiCallSuccess(response.data));
			if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
		} catch (error) {
			//general error handling
			// console.log(error.response.data);
			// dispatch(actions.apiCallFailed(error));

			if (onError) dispatch({ type: onError, payload: error.message });
		}
	};

export default api;
