import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemePicasso } from './components/Themes';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Error404 from './pages/Error404';


class App extends React.Component {
	render() {
		const theme = ThemePicasso;
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home}/>
					<Route path="/admin" component={Admin}/>
					<Route path="/login" exact component={Login}/>
					{/* <Route path="/admin/perms/notation" exact component={Notation}/> */}
					{/* <Route path="/admin/charte" exact component={Charte}/> */}
					<Route component={Error404}/>
				</Switch>
				{/* // <MuiThemeProvider theme={theme}>
				// 	<React.Fragment >

				// 		<div style={{
				// 			minHeight: '100%',
				// 			color: theme.palette.text.primary,
				// 			backgroundColor: theme.palette.background.default,
				// 			// paddingRight: "8%",
				// 			// paddingLeft: "8%",
				// 			margin: "auto",
				// 		}}>
				// 			<Switch>
				// 				<Route path="/" exact component={Home}/>
				// 				<Route path="/admin" exact component={Admin}/>
				// 				<Route path="/login" exact component={Login}/>
				// 				<Route path="/admin/perms/notation" exact component={Notation}/>
				// 				<Route path="/admin/charte" exact component={Charte}/>
				// 				<Route component={Error404}/>
				// 			</Switch>
				// 		</div>
				// 	</React.Fragment>
				// </MuiThemeProvider> */}
			</BrowserRouter>
		)
	}
}

export default App;
