import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, SEARCH_PHOTOS, GET_PHOTO } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SEARCH_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			};
		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false
			};
		case CLEAR_USERS:
			return {
				...state,
				users: [],
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case SEARCH_PHOTOS:
			return {
				...state,
				photos: action.payload,
				loading: false
			};
		case GET_PHOTO:
			return {
				...state,
				photo: action.payload,
				loading: false
			};
		default:
			return state;
	}
};
