import { SET_LOADING, GET_USER, SEARCH_PHOTOS, GET_PHOTO } from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_USER:
			return {
				...state,
				user: action.payload,
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
