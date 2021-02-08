import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SET_LOADING, GET_USER, SEARCH_PHOTOS, GET_PHOTO } from '../types';
import { createApi } from "unsplash-js";

const api = createApi({
	accessKey: process.env.REACT_APP_UNSPLASH_CLIENT_ID
});

const GithubState = (props) => {
	const initialState = {
		user: {},
		loading: false,
		photos: [],
		photo: {}
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Photos
	const searchPhotos = async (text) => {
		console.log(process.env.REACT_APP_UNSPLASH_CLIENT_ID);
		setLoading();

		const newRes = await api.search.getPhotos({
			query: text
		});
		console.log("🚀 ~ file: githubState.js ~ line 40 ~ newRes ~ newRes", newRes);

		if (newRes.errors) {
			// handle error here
			console.log('error occurred: ', newRes.errors[0]);
		} else {
			// extract total and results array from response
			const { total, results } = newRes.response;

			// handle success here
			console.log(`received ${results.length} photos out of ${total}`);
			console.log('first photo: ', results[0]);
			// console.log('1st user name: ', results[0].user.name);
			// console.log('1st where: ', results[0].alt_description);

			// getPhotoLocation(results[0].id);

			dispatch({
				type: SEARCH_PHOTOS,
				payload: results
			});
		}
	}

	const getPhoto = async (id) => {
		const res = await api.photos.get(
			{ photoId: id }
		);

		// if (res.response.location.name) {
		// 	payload = res.response.location.name;
		// } else {
		// 	console.log("No info about location.");
		// }
		// console.log("🚀line 74 ", payload)

		dispatch({
			type: GET_PHOTO,
			payload: res.response
		});
	}

	const getPhotoLocation = async (id) => {
		const res = await api.photos.get(
			{ photoId: id }
		);

		let payload = '';
		if (res.response.location.name) {
			payload = res.response.location.name;
		} else {
			console.log("No info about location.");
		}
		console.log("🚀line 74 ", payload)

		// dispatch({
		// 	type: GET_PHOTO_LOCATION,
		// 	payload: res.response.location
		// });
	}

	const getTopicsList = async (topic) => {
		const res = await api.topics.list({
			page: 1,
			perPage: 10
		});
		console.log("🚀 ~ file: githubState.js ~ line 107 ~ getTopicsList ~ res", res)
		// res.response.results.map(e => {
		// 	console.log(e)
		// })

		// dispatch({
		// 	type: GET_PHOTO_LOCATION,
		// 	payload: res.response.location
		// });
	}

	// Get User
	const getUser = async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_UNSPLASH_CLIENT_ID}&client_secret=${process.env.REACT_APP_UNSPLASH_CLIENT_SECRET}`
		);

		dispatch({
			type: GET_USER,
			payload: res.data
		});
	};

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				photos: state.photos,
				user: state.user,
				loading: state.loading,
				searchPhotos,
				getUser,
				getPhoto,
				getPhotoLocation,
				getTopicsList
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
