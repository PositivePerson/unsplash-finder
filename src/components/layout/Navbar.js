import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
	return (
		<nav className='navbar bg-primary'>
			<h2 className="mb-0">
				<Link to='/'><i>{title}</i></Link>
			</h2>
			<ul className="mb-0">
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/About'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	title: 'Unsplash Finder'
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired
};

export default Navbar;
