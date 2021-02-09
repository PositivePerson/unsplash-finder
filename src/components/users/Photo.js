import React, { Fragment, useContext } from 'react';
import Spinner from '../layout/Spinnner';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

import {
	MDBModal,
	MDBModalBody
} from "mdbreact";

const Photo = ({ modal, setModal }) => {
	const githubContext = useContext(GithubContext);

	const { loading, photo } = githubContext;

	if (loading) return <Spinner />;

	return (
		<Fragment>
			<MDBModal isOpen={modal} toggle={() => setModal(!modal)} centered>
				<MDBModalBody>
					<div className="pb-2">
						<img src={photo.user.profile_image.small} alt='' className='round-img' style={{ width: '45px' }} />
						<h5 className="d-inline ml-2">{photo.user.name}</h5>
					</div>
					<img src={photo.urls.regular} alt='' />
					{photo.location.name &&
						<div className="pt-2 ml-2">
							<i class="fas fa-map-marker-alt"></i>
							<span className="d-inline ml-3">{photo.location.name}</span>
						</div>
					}
				</MDBModalBody>
			</MDBModal>
		</Fragment>
	);
};

Photo.propTypes = {
	loading: PropTypes.bool.isRequired,
	photo: PropTypes.object.isRequired,
};

export default Photo;
