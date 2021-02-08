import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ photo: { location, urls, id } }) => {
	return (
		<div className='card text-center' style={{ padding: "unset" }}>
			<Link to={`/user/${id}`}>
				<img src={urls.small} alt='' className='' style={{ maxWidth: '30vw' }} />
			</Link>
		</div>
	);
};

UserItem.propTypes = {
	photo: PropTypes.object.isRequired
};

export default UserItem;
