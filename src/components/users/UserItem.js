import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import GithubContext from '../../context/github/githubContext';

const UserItem = ({ tilePhoto: { location, urls, id }, modal, setModal }) => {
	const githubContext = useContext(GithubContext);
	const { getPhoto, photo } = githubContext;

	const imgClick = () => {
		console.log("🚀 ~ file: UserItem.js ~ line 11 ~ imgClick ~ id", id);
		getPhoto(id);
		console.log(photo);
		setModal(!modal);
	}

	// useEffect(() => {
	// 	if (Object.keys(photo).length) {
	// 		setModal(!modal);
	// 	}
	// }, [photo])

	return (
		<div className='card text-center' style={{ padding: "unset" }}>
			<a>
				<img onClick={() => imgClick()} src={urls.small} alt='' className='' style={{ maxWidth: '30vw' }} />
			</a>
		</div>
	);
};

UserItem.propTypes = {
	photo: PropTypes.object.isRequired
};

export default UserItem;
