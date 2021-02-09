import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

import Autosuggest from 'react-autosuggest';

const languages = [
	{
		name: 'C',
		year: 1972
	},
	{
		name: 'Elm',
		year: 2012
	},
	{
		name: 'Elma',
		year: 2012
	},
	{
		name: 'Ella',
		year: 2012
	}
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0 ? [] : languages.filter(lang =>
		lang.name.toLowerCase().slice(0, inputLength) === inputValue
	);
};

const shouldRenderSuggestions = (value, reason) => {
	return value.trim().length > 2;
}

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
	<div>
		{suggestion.name}
	</div>
);

const Search = ({ history, setAlert }) => {
	const githubContext = useContext(GithubContext);

	const [text, setText] = useState('');
	const [finalPhrase, setFinalPhrase] = useState('');
	const [suggestions, setSuggestion] = useState([]);

	useEffect(() => {
		if (finalPhrase === text && finalPhrase) { onSubmit() };
		// return () => {
		// 	setFinalPhrase('');
		// }
	}, [finalPhrase, text])

	// const onChange = (e) => setText(e.target.value);
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
		console.log("🚀 ~ file: Search.js ~ line 82 ~ Search ~ suggestion.name", suggestion.name);
		setText(suggestion.name);
		setFinalPhrase(suggestion.name);

		return suggestion.name;
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
			githubContext.searchPhotos(text);
			setText('');

			history.push(`/photos/${text}`);
			console.log("🚀 ~ file: Search.js ~ line 93 ~ onSubmit ~ text", text)

			githubContext.getTopicsList(text);
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
	setAlert: PropTypes.func.isRequired
};

export default withRouter(Search);
