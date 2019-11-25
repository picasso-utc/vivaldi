import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import './App.css';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Charte from './components/Charte';
import Menu from './components/Menu';
import Error404 from './pages/Error404';
import ProtectedRoute from './utils/ProtectedRoute';
import TV from './pages/TV';
import TVContent from './pages/TVContent';
import TVMenu from './pages/TVMenu';
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
					<Route path="/charte" exact component={Charte}/>
					<Route path="/poll/:id" exact component={Poll}/>
					<Route path="/menu" component={Menu} />
					<Route path="/tv" exact component={TV}/>
					<Route path="/tv/content" exact component={TVContent}/>
					<Route path="/tv/menu" exact component={TVMenu}/>
					<Route component={Error404}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
