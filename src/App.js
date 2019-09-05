import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';

import './App.css';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Error404 from './pages/Error404';


class App extends React.Component {
	render() {
		return (
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/admin" component={Admin}/>
						<Route path="/login" exact component={Login}/>
						<Route component={Error404}/>
					</Switch>
				</BrowserRouter>
			</MuiPickersUtilsProvider>
		)
	}
}

export default App;
