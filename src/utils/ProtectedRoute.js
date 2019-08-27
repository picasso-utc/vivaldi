  
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';


class ProtectedRoute extends React.Component {

	isAuthorized = (only) => {
		if (only == "admin") {
            return Auth.isUserAdmin();
        } else if (only == "member"){
            return Auth.isUserMember();

        } else {
            return Auth.isUserAuthenticated();
        }
	}

	render() {
		const { auth, only, redirection, component: Component, ...routeProps } = this.props;
		return (
			<Route
				{...routeProps} 
				render={props => (this.isAuthorized(only)
					? <Component {...props} />
					: <Redirect to={redirection} />
				)}
			/>
		);
    }
    
}

ProtectedRoute.defaultProps = {
	// only: 'member',
	redirection: '/login',
}

export default ProtectedRoute;