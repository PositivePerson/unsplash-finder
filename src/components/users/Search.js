import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

import Autosuggest from 'react-autosuggest';

let suggestionsArray = [
	{
		slug: 'Apples'
	},
	{
		slug: 'Kiwi'
	},
	{
		slug: 'Oranges'
	},
	{
		slug: 'Watermelon'
	}
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0 ? [] : suggestionsArray.filter(lang =>
		lang.slug.toLowerCase().slice(0, inputLength) === inputValue
	);
};

const shouldRenderSuggestions = (value, reason) => {
	return value.trim().length > 2;
}

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
	<div>
		{suggestion.slug}
	</div>
);

const Search = ({ history, setAlert }) => {
	const githubContext = useContext(GithubContext);
	const { getTopicsList, topicList, searchPhotos } = githubContext;

	const [text, setText] = useState('');
	const [finalPhrase, setFinalPhrase] = useState('');
	const [suggestions, setSuggestion] = useState([]);

	useEffect(() => {
		getTopicsList(text);
	}, [])

	useEffect(() => {
		if (topicList) suggestionsArray = topicList.results;
	}, [topicList])

	useEffect(() => {
		if (finalPhrase === text && finalPhrase) { onSubmit() };
	}, [finalPhrase, text])

	const suggestOnChange = (e, { newValue }) => {
		setText(typeof newValue !== 'undefined' ? newValue : '')
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	const onSuggestionsFetchRequested = () => {
		setSuggestion(getSuggestions(text));
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	const onSuggestionsClearRequested = () => {
		setSuggestion([]);
	};

	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	const getSuggestionValue = suggestion => {
		setText(suggestion.slug);
		setFinalPhrase(suggestion.slug);

		return suggestion.slug;
	};

	// Autosuggest will pass through all these props to the input.
	const inputProps = {
		placeholder: 'Search Photo...',
		value: text,
		onChange: suggestOnChange
	};

	const onSubmit = (e) => {
		if (e) e.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		} else {
			searchPhotos(text);
			setText('');

			history.push(`/photos/${text}`);
		}
	};

	return (
		<div style={window.location.pathname === '/' ? firstPageStyle : {}}>
			<form className='form' name="searchForm" onSubmit={onSubmit}>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={onSuggestionsFetchRequested}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					shouldRenderSuggestions={shouldRenderSuggestions}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
				/>
			</form>
		</div >
	);
};

const firstPageStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -60%)',
	width: '100%',
	padding: '0 5em'
};

Search.propTypes = {
	getTopicsList: PropTypes.func.isRequired,
	searchPhotos: PropTypes.func.isRequired,
	topicList: PropTypes.array.isRequired
};

export default withRouter(Search);
