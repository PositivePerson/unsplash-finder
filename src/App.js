import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Photos from './components/users/Photos';
import Photo from './components/users/Photo';
import Search from './components/users/Search';
import About from './components/pages/About';

import GithubState from './context/github/githubState';

import './App.css';

const App = () => {
	const [modal, setModal] = useState(false);

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Search {...props} />
								)}
							/>
							<Route
								exact
								path='/photos/:phrase'
								render={(props) => (
									<Fragment>
										<Search />
										<Photos modal={modal} setModal={setModal} />
										{modal &&
											<Photo {...props} modal={modal} setModal={setModal} />
										}
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
