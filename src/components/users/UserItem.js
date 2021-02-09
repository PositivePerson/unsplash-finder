import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import GithubContext from '../../context/github/githubContext';

const UserItem = ({ tilePhoto: { urls, id }, modal, setModal }) => {
	const githubContext = useContext(GithubContext);
	const { getPhoto } = githubContext;

	const imgClick = () => {
		getPhoto(id);
		setModal(!modal);
	}

	return (
		<div className='card text-center' style={{ padding: "unset" }}>
			<a>
				<img onClick={() => imgClick()} src={urls.small} alt='' className='' style={{ maxWidth: '30vw' }} />
			</a>
		</div>
	);
};

UserItem.propTypes = {
	getPhoto: PropTypes.func.isRequired
};

export default UserItem;
