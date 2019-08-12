import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Error404 from './pages/Error404';


class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home}/>
					<Route path="/admin" component={Admin}/>
					<Route path="/login" exact component={Login}/>
					<Route component={Error404}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
