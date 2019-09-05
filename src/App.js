import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import ProtectedRoute from './utils/ProtectedRoute';

const PUBLIC_URL = process.env.PUBLIC_URL;

class App extends React.Component {
	render() {
		return (
			<BrowserRouter basename={PUBLIC_URL}>
				<Switch>
					<Route path="/" exact component={Home}/>
					<ProtectedRoute only="member" path="/admin" component={Admin}/>
					<Route path="/login" exact component={Login}/>
					<Route component={Error404}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
