import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinnner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

import {
	MDBInput,
	MDBBtn,
	MDBModal,
	MDBModalBody,
	MDBContainer,
	MDBModalHeader,
	MDBModalFooter
} from "mdbreact";

const User = ({ match, modal, setModal }) => {
	const githubContext = useContext(GithubContext);

	useEffect(() => {
		// getPhoto("LpZzUuQa80Q");
	}, []);

	const { loading, photo } = githubContext;
	// if (photo.urls.regular) console.log("regular work")

	// const {
	// 	location
	// } = photo;

	if (loading) return <Spinner />;

	return (
		<Fragment>
			<MDBModal isOpen={modal} toggle={() => setModal(!modal)} centered>
				<MDBModalHeader>MDBModal title</MDBModalHeader>
				<MDBModalBody>
					<img src={photo.urls.regular} alt='' />
				</MDBModalBody>
				<MDBModalFooter center>
					<button className='btn btn-light' onClick={() => setModal(!modal)}>Close</button>
				</MDBModalFooter>
			</MDBModal>
			{/* <div className='card grid-2'>
				<div className='all-center'>
					<img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }} />
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className='btn btn-dark my-1'>
						Visit Github Profile
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username: </strong> {login}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<strong>Company: </strong> {company}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<strong>Website: </strong> {blog}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div> */}
		</Fragment>
	);
};

export default User;
