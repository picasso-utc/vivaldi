import React from 'react';
import axios from 'axios';

/*
To try the connection, use this in the JS console after login:
(await a.get('auth/me', { withCredentials: true })).data
*/

class LoginPage extends React.Component {
	componentDidMount() {
		this.redirect()
	}

	redirect() {
		const apiURL = axios.defaults.baseURL;
		const callback = String(window.location).replace(/(.*)log(in|out)\/?$/, '$1');
		window.location.replace(`${apiURL}/auth/login?redirect=${callback}`);
	}

	render() {
		return (
			<div className="container">
				<span>Logging in...</span>
			</div>
		);
	}
}

export default LoginPage;