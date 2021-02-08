import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ photo: { location, urls, id } }) => {
	return (
		<div className='card text-center'>
			<img src={urls.small} alt='' className='' style={{ width: '60px' }} />
			<h3>{location}</h3>

			<div>
				<Link to={`/user/${id}`} className='btn btn-dark btn-sm my-1'>
					More
				</Link>
			</div>
		</div>
	);
};

UserItem.propTypes = {
	photo: PropTypes.object.isRequired
};

export default UserItem;
