import React from 'react';
import axios from 'axios';
import Auth from '../utils/Auth';
// import  { Redirect } from 'react-router-dom'

/*
To try the connection, use this in the JS console after login:
(await a.get('auth/me', { withCredentials: true })).data
*/

class LoginPage extends React.Component {
	// componentDidMount() {
	// 	this.redirect()
	// }

	constructor(props) {
		super(props);
	}

	componentDidMount(){
		console.log(Auth.isUserAuthenticated())
		if(Auth.isUserAuthenticated()){
			this.redirectUser();
		} else {
			this.loginUser();
		}
	}

	redirectUser(){
		window.location = '/admin'
		// <Redirect to='/admin'  />
		// Auth.redirectUser();
	}

	loginUser(){
		Auth.login();
	}

	// redirect() {
	// 	const apiURL = axios.defaults.baseURL;
	// 	const callback = String(window.location).replace(/(.*)log(in|out)\/?$/, '$1');
	// 	window.location.replace(`${apiURL}/auth/login?redirect=${callback}`);
	// }

	render() {
		return (
			<div className="container">
				<span>Logging in...</span>
			</div>
		);
	}
}

export default LoginPage;