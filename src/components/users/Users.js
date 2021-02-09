import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinnner';
import GithubContext from '../../context/github/githubContext';

const Users = ({ modal, setModal }) => {
	const githubContext = useContext(GithubContext);

	const { loading, photos } = githubContext;

	if (loading) {
		return <Spinner />;
	} else {
		console.log(photos);
		return <div style={userStyle}>{photos.map((photo) => <UserItem key={photo.id} tilePhoto={photo} modal={modal} setModal={setModal} />)}</div>;
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default Users;
