import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/githubState';

import './App.css';

const App = () => {
	const [modal, setModal] = useState(false);

	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process
	// 			.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({ users: res.data, loading: false });
	// }

	// Set Alert
	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Search {...props} setAlert={showAlert} />
								)}
							/>
							<Route
								exact
								path='/photos/:phrase'
								render={(props) => (
									<Fragment>
										<Search setAlert={showAlert} />
										<Users modal={modal} setModal={setModal} />
										{modal &&
											<User {...props} modal={modal} setModal={setModal} />
										}
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							{/* <Route
								exact
								path='/user/:login'
								render={(props) => <User {...props} />}
							/> */}
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
