import React, { useState, useContext } from 'react';
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
	}
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
	console.log("🚀 ~ file: Search.js ~ line 21 ~ value", value)
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0 ? [] : languages.filter(lang =>
		lang.name.toLowerCase().slice(0, inputLength) === inputValue
	);
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
	<div>
		{suggestion.name}
	</div>
);

const Search = ({ history, setAlert }) => {
	const githubContext = useContext(GithubContext);

	const [text, setText] = useState('');
	const [value, setValue] = useState('');
	const [suggestions, setSuggestion] = useState([]);

	const onChange = (e) => setText(e.target.value);
	const suggestOnChange = (e, { newValue }) => {
		console.log(e.target.value);
		console.log(newValue);
		typeof newValue !== 'undefined' ? setValue(newValue) : setValue('');
		// setValue(typeof newValue !== 'undefined' ? newValue : '')
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	const onSuggestionsFetchRequested = () => {
		setSuggestion(getSuggestions(value));
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	const onSuggestionsClearRequested = () => {
		setSuggestion([]);
	};

	// Autosuggest will pass through all these props to the input.
	const inputProps = {
		placeholder: 'Type a programming language',
		value,
		onChange: suggestOnChange
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		} else {
			githubContext.searchPhotos(text);
			setText('');
			setValue('');

			history.push(`/photos/${text}`);

			githubContext.getTopicsList(text);
		}
	};

	return (
		<div style={window.location.pathname === '/' ? firstPageStyle : {}}>
			<form className='form' onSubmit={onSubmit}>
				<input type='text' name='text' placeholder='Search Photo...' value={text} onChange={onChange} />
				{/* <input type='submit' value='Search' className='btn btn-dark btn-block' /> */}

				{/* {text ?
					(
						<Link to={`/photos/${text}`}>
							<input type='submit' value='Search' className='btn btn-dark btn-block' />
						</Link>
					) : (
						<input type='submit' value='Search' className='btn btn-dark btn-block' />
					)
				} */}
			</form>
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
			/>
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
