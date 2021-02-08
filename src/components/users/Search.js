import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import GithubContext from '../../context/github/githubContext';

const Search = ({ history, setAlert }) => {

	const githubContext = useContext(GithubContext);

	githubContext.getTopicsList('party');

	const [text, setText] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		} else {
			githubContext.searchPhotos(text);
			setText('');

			history.push(`/photos/${text}`);
		}
	};

	const onChange = (e) => setText(e.target.value);

	return (
		<div style={window.location.pathname === '/' ? firstPageStyle : {}}>
			<form className='form' onSubmit={onSubmit}>
				<input type='text' name='text' placeholder='Search Users...' value={text} onChange={onChange} />
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
