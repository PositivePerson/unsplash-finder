import { SET_LOADING, SEARCH_PHOTOS, GET_PHOTO, GET_TOPIC_LIST } from '../types';

export default (state, action) => {
	switch (action.type) {
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
		case GET_TOPIC_LIST:
			return {
				...state,
				topicList: action.payload,
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
