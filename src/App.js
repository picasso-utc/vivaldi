import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import './App.css';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Charte from './components/Charte';
import Menu from './components/Menu';
import Error404 from './pages/Error404';
import ProtectedRoute from './utils/ProtectedRoute';
import Poll from './pages/Poll';

const PUBLIC_URL = process.env.PUBLIC_URL;

class App extends React.Component {
	render() {
		return (
			<BrowserRouter basename={PUBLIC_URL}>
				<CssBaseline />
				<Switch>
					<Route path="/" exact component={Home}/>
					<ProtectedRoute only="member" path="/admin" component={Admin}/>
					<Route path="/login" exact component={Login}/>
					<Route path="/logout" exact component={Logout}/>
					<Route path="/charte" exact component={Charte}/>
					<ProtectedRoute path="/poll/:id" exact component={Poll}/>
					<Route path="/menu" component={Menu} />
					<Route component={Error404}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
