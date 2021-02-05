import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';
import { createApi } from "unsplash-js";

const api = createApi({
	accessKey: process.env.REACT_APP_UNSPLASH_CLIENT_ID
});

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	const searchUsers = async (text) => {
		console.log(process.env
			.REACT_APP_UNSPLASH_CLIENT_ID);
		setLoading();

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_UNSPLASH_CLIENT_ID}&client_secret=${process.env.REACT_APP_UNSPLASH_CLIENT_SECRET}`
		);

		api.users.getPhotos({ username: 'luismorerat' }).then(result => {
			if (result.errors) {
				// handle error here
				console.log('error occurred: ', result.errors[0]);
			} else {
				const feed = result.response;

				// extract total and results array from response
				const { total, results } = feed;

				// handle success here
				console.log(`received ${results.length} photos out of ${total}`);
				console.log('first photo: ', results[0]);
			}
		});

		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items
		});
	};

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

	// Get Repos

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
