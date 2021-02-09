import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SET_LOADING, SEARCH_PHOTOS, GET_PHOTO, GET_TOPIC_LIST } from '../types';
import { createApi } from "unsplash-js";

const api = createApi({
	accessKey: process.env.REACT_APP_UNSPLASH_CLIENT_ID
});

const GithubState = (props) => {
	const initialState = {
		user: {},
		loading: false,
		photos: [],
		photo: {},
		topicList: []
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Photos
	const searchPhotos = async (text) => {
		setLoading();

		const newRes = await api.search.getPhotos({
			query: text
		});

		if (newRes.errors) {
			console.log('error occurred: ', newRes.errors[0]);
		} else {
			const { total, results } = newRes.response;

			// handle success here
			console.log(`received ${results.length} photos out of ${total}`);
			console.log('first photo: ', results[0]);

			dispatch({
				type: SEARCH_PHOTOS,
				payload: results
			});
		}
	}

	const getPhoto = async (id) => {
		setLoading();

		const res = await api.photos.get(
			{ photoId: id }
		);

		dispatch({
			type: GET_PHOTO,
			payload: res.response
		});
	}

	const getTopicsList = async (topic) => {
		const res = await api.topics.list({
			page: 1,
			perPage: 10
		});

		dispatch({
			type: GET_TOPIC_LIST,
			payload: res.response
		});
	}

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				photos: state.photos,
				photo: state.photo,
				topicList: state.topicList,
				user: state.user,
				loading: state.loading,
				searchPhotos,
				getPhoto,
				getTopicsList
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
