import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PhotoItem from './PhotoItem';
import Spinner from '../layout/Spinnner';
import GithubContext from '../../context/github/githubContext';

const Photos = ({ modal, setModal }) => {
	const githubContext = useContext(GithubContext);

	const { loading, photos } = githubContext;

	if (loading) {
		return <Spinner />;
	} else {
		console.log(photos);
		return <div style={userStyle}>{photos.map((photo) => <PhotoItem key={photo.id} tilePhoto={photo} modal={modal} setModal={setModal} />)}</div>;
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

Photos.propTypes = {
	loading: PropTypes.bool.isRequired,
	photos: PropTypes.array.isRequired,
};

export default Photos;
